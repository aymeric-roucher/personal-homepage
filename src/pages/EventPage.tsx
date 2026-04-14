import { useState, useEffect, MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface Guest {
  name: string;
  status: 'going' | 'maybe' | 'cant-go';
  timestamp: number;
}

interface FireEffect {
  id: number;
  x: number;
  y: number;
}

const STORAGE_KEY = 'event-guests-ultra-intelligence';

const EventPage = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'going' | 'maybe' | 'cant-go' | null>(null);
  const [guestName, setGuestName] = useState('');
  const [fireEffects, setFireEffects] = useState<FireEffect[]>([]);
  const [nextFireId, setNextFireId] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setGuests(JSON.parse(stored));
    }
  }, []);

  const saveGuests = (newGuests: Guest[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newGuests));
    setGuests(newGuests);
  };

  const handleStatusClick = (status: 'going' | 'maybe' | 'cant-go') => {
    setSelectedStatus(status);
    setGuestName('');
  };

  const handleSubmitName = () => {
    if (!guestName.trim() || !selectedStatus) return;

    const newGuest: Guest = {
      name: guestName.trim(),
      status: selectedStatus,
      timestamp: Date.now(),
    };

    const updatedGuests = [...guests, newGuest];
    saveGuests(updatedGuests);
    setGuestName('');
    setSelectedStatus(null);
  };

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('fire-click-area')) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 3; i++) {
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 60;
        const id = nextFireId + i;

        setFireEffects(prev => [...prev, {
          id,
          x: x + offsetX,
          y: y + offsetY,
        }]);

        setTimeout(() => {
          setFireEffects(prev => prev.filter(f => f.id !== id));
        }, 1000);
      }

      setNextFireId(prev => prev + 3);
    }
  };

  const goingCount = guests.filter(g => g.status === 'going').length;
  const maybeCount = guests.filter(g => g.status === 'maybe').length;
  const cantGoCount = guests.filter(g => g.status === 'cant-go').length;

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'going': return '👍';
      case 'maybe': return '🤔';
      case 'cant-go': return '😢';
      default: return '';
    }
  };

  return (
    <div
      className="fire-click-area min-h-screen bg-[#FDF6EC] p-4 md:p-8 relative overflow-hidden cursor-default"
      onClick={handleBackgroundClick}
    >
      {fireEffects.map(fire => (
        <img
          key={fire.id}
          src="/feu.png"
          alt=""
          className="absolute w-12 h-12 pointer-events-none animate-fire-effect"
          style={{
            left: `${fire.x}px`,
            top: `${fire.y}px`,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Lancement OFFICIEL Ultra-Intelligence
            </h1>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-semibold text-xl">Thursday, Oct 23</p>
                  <p className="text-lg text-gray-600">6:30pm – 8:00pm</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="text-lg">
                    Hosted by <span className="font-semibold">Aymeric Roucher</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-lg">Librairie Eyrolles</p>
                  <p className="text-gray-600">55-57-61 Boulevard St-Germain, Paris</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-2xl">🎉</span>
                <p className="text-lg">Bring your friends</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 pt-4">
              Mini conférence, puis dédicaces. Et un apéro servi en continu !
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Guest List</h2>
            <p className="text-lg text-gray-600">{goingCount} Going</p>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {guests.filter(g => g.status === 'going').map((guest, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <span className="text-2xl">{getStatusEmoji(guest.status)}</span>
                  <span className="text-gray-800 font-medium">{guest.name}</span>
                </div>
              ))}
            </div>

            {(maybeCount > 0 || cantGoCount > 0) && (
              <details className="mt-4">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                  View all ({guests.length} total)
                </summary>
                <div className="space-y-2 mt-2">
                  {maybeCount > 0 && (
                    <>
                      <p className="text-sm font-semibold text-gray-500 mt-4">Maybe ({maybeCount})</p>
                      {guests.filter(g => g.status === 'maybe').map((guest, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                          <span className="text-2xl">{getStatusEmoji(guest.status)}</span>
                          <span className="text-gray-800 font-medium">{guest.name}</span>
                        </div>
                      ))}
                    </>
                  )}
                  {cantGoCount > 0 && (
                    <>
                      <p className="text-sm font-semibold text-gray-500 mt-4">Can't Go ({cantGoCount})</p>
                      {guests.filter(g => g.status === 'cant-go').map((guest, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                          <span className="text-2xl">{getStatusEmoji(guest.status)}</span>
                          <span className="text-gray-800 font-medium">{guest.name}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-8 h-fit space-y-6">
          <img
            src="/lancement_ultra_intelligence.png"
            alt="Book Launch Event"
            className="w-full rounded-xl shadow-lg"
          />

          {!selectedStatus ? (
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleStatusClick('going')}
                className="flex flex-col items-center justify-center p-6 bg-blue-100 hover:bg-blue-200 rounded-2xl transition-colors cursor-pointer"
              >
                <span className="text-4xl mb-2">👍</span>
                <span className="font-semibold text-gray-800">Going</span>
              </button>

              <button
                onClick={() => handleStatusClick('maybe')}
                className="flex flex-col items-center justify-center p-6 bg-yellow-100 hover:bg-yellow-200 rounded-2xl transition-colors cursor-pointer"
              >
                <span className="text-4xl mb-2">🤔</span>
                <span className="font-semibold text-gray-800">Maybe</span>
              </button>

              <button
                onClick={() => handleStatusClick('cant-go')}
                className="flex flex-col items-center justify-center p-6 bg-red-100 hover:bg-red-200 rounded-2xl transition-colors cursor-pointer"
              >
                <span className="text-4xl mb-2">😢</span>
                <span className="font-semibold text-gray-800">Can't Go</span>
              </button>
            </div>
          ) : (
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getStatusEmoji(selectedStatus)}</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  You're {selectedStatus === 'going' ? 'Going' : selectedStatus === 'maybe' ? 'Maybe Going' : "Can't Go"}!
                </h3>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Your Name</label>
                <Textarea
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name..."
                  className="resize-none"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmitName();
                    }
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSubmitName}
                  className="flex-1"
                  disabled={!guestName.trim()}
                >
                  Submit
                </Button>
                <Button
                  onClick={() => setSelectedStatus(null)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fire-effect {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx, 20px), var(--ty, -30px)) scale(1.5) rotate(var(--rot, 20deg));
            opacity: 0;
          }
        }

        .animate-fire-effect {
          --tx: ${Math.random() * 40 - 20}px;
          --ty: ${Math.random() * -40 - 20}px;
          --rot: ${Math.random() * 60 - 30}deg;
          animation: fire-effect 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EventPage;
