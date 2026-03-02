import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Info, Github, Download } from 'lucide-react';
import JSZip from 'jszip';
import { COHORT_DATA, COHORT_VERSION, CohortMember } from './data/cohort';
import { PokedexCard } from './components/PokedexCard';
import { PokedexModal } from './components/PokedexModal';
import { cn } from './lib/utils';

export default function App() {
  const [cohort, setCohort] = useState<CohortMember[]>(() => {
    const saved = localStorage.getItem('mstp_cohort_data');
    if (!saved) return COHORT_DATA;

    // Clear stale localStorage only when there's an explicit version mismatch.
    // If no version is stored yet (pre-versioning data), leave it untouched
    // so uploaded images aren't lost. Once the user runs export+import+push,
    // the version gets set and future deploys will correctly invalidate Vercel caches.
    const savedVersion = localStorage.getItem('mstp_cohort_version');
    if (savedVersion && savedVersion !== COHORT_VERSION) {
      localStorage.removeItem('mstp_cohort_data');
      localStorage.removeItem('mstp_cohort_version');
      return COHORT_DATA;
    }

    try {
      const parsedSaved = JSON.parse(saved) as CohortMember[];
      // Merge: Keep saved edits for existing members, but add any new members from COHORT_DATA
      const merged = [...parsedSaved];

      COHORT_DATA.forEach(defaultMember => {
        const exists = merged.some(m => m.id === defaultMember.id);
        if (!exists) {
          merged.push(defaultMember);
        }
      });

      // Preserve saved order; new members are appended at the end
      return merged;
    } catch (e) {
      console.error("Failed to parse saved cohort data", e);
      return COHORT_DATA;
    }
  });
  const [selectedMember, setSelectedMember] = useState<CohortMember | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const [isModalEditing, setIsModalEditing] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const didDropRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('mstp_cohort_data', JSON.stringify(cohort));
    localStorage.setItem('mstp_cohort_version', COHORT_VERSION);
  }, [cohort]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMember || isModalEditing) return;

      const navigable = canEdit ? cohort : cohort.filter(m => !m.hidden);
      const currentIndex = navigable.findIndex(m => m.id === selectedMember.id);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % navigable.length;
        setSelectedMember(navigable[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + navigable.length) % navigable.length;
        setSelectedMember(navigable[prevIndex]);
      } else if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember, cohort, canEdit, isModalEditing]);

  const handleUpdateMember = (updatedMember: CohortMember) => {
    setCohort(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    setSelectedMember(updatedMember);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.effectAllowed = 'move';
    didDropRef.current = false;
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id !== draggedId) setDragOverId(id);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    didDropRef.current = true;
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    setCohort(prev => {
      const next = [...prev];
      const from = next.findIndex(m => m.id === draggedId);
      const to = next.findIndex(m => m.id === targetId);
      next.splice(to, 0, next.splice(from, 1)[0]);
      return next;
    });
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleExport = async () => {
    const zip = new JSZip();
    const images = zip.folder('images');

    const cleanCohort = cohort.map(member => {
      const clean = { ...member };

      // Handle main image
      if (clean.imageUrl?.startsWith('data:')) {
        const ext = clean.imageUrl.split(';')[0].split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';
        const filename = `${member.id}.${ext}`;
        const base64 = clean.imageUrl.split(',')[1];
        images!.file(filename, base64, { base64: true });
        clean.imageUrl = `/images/${filename}`;
      }

      // Handle gallery images
      if (clean.galleryImages?.length) {
        clean.galleryImages = clean.galleryImages.map((img, i) => {
          if (img.startsWith('data:')) {
            const ext = img.split(';')[0].split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';
            const filename = `${member.id}-gallery-${i + 1}.${ext}`;
            const base64 = img.split(',')[1];
            images!.file(filename, base64, { base64: true });
            return `/images/${filename}`;
          }
          return img;
        });
      }

      return clean;
    });

    // Add cohort JSON
    zip.file('cohort-export.json', JSON.stringify(cleanCohort, null, 2));

    // Add a README with instructions
    zip.file('README.txt', [
      'COHORT EXPORT',
      '=============',
      '',
      '1. Move all files from the images/ folder into your project\'s public/images/',
      '2. Run: node scripts/import-cohort.mjs cohort-export.json',
      '3. Run: git add . && git commit -m "update cohort" && git push',
    ].join('\n'));

    // Generate and download zip
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cohort-export.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 selection:bg-pokedex-red selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-pokedex-red border-b-4 border-black/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner border-4 border-zinc-200 translate-y-1">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                alt="Pokeball"
                className="w-12 h-12 animate-bounce"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-pixel text-xs md:text-sm tracking-tighter text-white drop-shadow-md uppercase">MSTP M1 Pokedex</h1>
              <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest mt-0.5">Gotta Research 'Em All</p>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <div className="flex items-end gap-0.5">
              {cohort.filter(m => !m.hidden).map(member => (
                <img
                  key={member.id}
                  src={member.spriteUrl}
                  alt={member.name}
                  title={member.name}
                  className="w-10 h-10 -mb-1"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(canEdit ? cohort : cohort.filter(m => !m.hidden)).map((member) => (
            <div
              key={member.id}
              draggable={canEdit}
              onDragStart={(e) => handleDragStart(e, member.id)}
              onDragOver={(e) => handleDragOver(e, member.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, member.id)}
              onDragEnd={handleDragEnd}
              className={cn(
                "relative transition-all duration-150 rounded-2xl",
                canEdit && "cursor-grab active:cursor-grabbing",
                draggedId === member.id && "opacity-30 scale-95",
                dragOverId === member.id && draggedId !== member.id && "ring-4 ring-pokedex-red ring-offset-4 scale-[1.02]",
                canEdit && member.hidden && "opacity-50",
              )}
            >
              <PokedexCard
                member={member}
                onClick={() => {
                  if (didDropRef.current) { didDropRef.current = false; return; }
                  setSelectedMember(member);
                }}
              />
              {canEdit && member.hidden && (
                <div className="absolute inset-0 rounded-2xl flex items-center justify-center pointer-events-none">
                  <span className="bg-zinc-900/80 text-white font-pixel text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                    Hidden
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 py-16 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-pokedex-red" />
        <img 
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png" 
          alt="Snorlax" 
          className="absolute -bottom-10 -right-10 w-64 opacity-10 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <div className="flex items-center gap-3">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png" 
                alt="Ultra Ball" 
                className="w-11 h-11"
                referrerPolicy="no-referrer"
              />
              <h2 className="font-pixel text-xs">MSTP Pokedex</h2>
            </div>
            <p className="text-xs text-zinc-500 font-mono max-w-xs text-center md:text-left">
              The definitive guide to the M1 MSTP cohort.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              <span className="text-zinc-500 font-pixel text-[8px]">Stanford Region</span>
              <span className="text-zinc-500 font-pixel text-[8px]">M1 Class</span>
            </div>
            <div className="text-[10px] text-pokedex-blue font-black uppercase tracking-[0.2em] flex items-center gap-4">
              <span>Stanford MSTP Entering Class of 2025</span>
              <button 
                onClick={() => setCanEdit(!canEdit)}
                className="w-2 h-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                title="Toggle Edit Mode"
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Export button — floats above modal when editing */}
      <AnimatePresence>
        {isModalEditing && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={handleExport}
            className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white rounded-xl font-bold text-xs uppercase shadow-xl hover:bg-zinc-700 transition-colors border border-white/10"
          >
            <Download className="w-4 h-4" />
            Export All
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <PokedexModal
        member={selectedMember}
        canEdit={canEdit}
        onClose={() => {
          setSelectedMember(null);
          setIsModalEditing(false);
        }}
        onUpdate={handleUpdateMember}
        onEditChange={setIsModalEditing}
      />
    </div>
  );
}
