'use client';

import { useChess, getPieceSymbol, Piece } from '@/hooks/useChess';

export default function Chess() {
  const { state, selectOrMove, reset } = useChess();
  const { board, selected, validMoves, status } = state;

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-white">
      <p className="text-sm font-medium text-white/70 mb-4">{status}</p>

      <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10" style={{ width: 400, height: 400 }}>
        {board.map((row, r) => (
          <div key={r} className="flex" style={{ height: '12.5%' }}>
            {row.map((piece, c) => {
              const isLight = (r + c) % 2 === 0;
              const isSelected = selected?.[0] === r && selected?.[1] === c;
              const isValid = validMoves.some(([mr, mc]) => mr === r && mc === c);
              const isCapture = isValid && !!piece;

              let bg = isLight ? '#f0d9b5' : '#b58863';
              if (isSelected) bg = '#f6f669';
              else if (isValid && !isCapture) bg = isLight ? '#cdd16a' : '#aaa23a';

              return (
                <div
                  key={c}
                  className="relative flex items-center justify-center cursor-pointer"
                  style={{ width: '12.5%', height: '100%', background: bg, userSelect: 'none' }}
                  onClick={() => selectOrMove(r, c)}
                >
                  {isValid && !isCapture && (
                    <div className="absolute w-1/3 h-1/3 rounded-full bg-black/20 pointer-events-none" />
                  )}
                  {piece && (
                    <span
                      className="pointer-events-none leading-none"
                      style={{
                        fontSize: 32,
                        color: piece.color === 'w' ? '#fff' : '#1a1a1a',
                        textShadow: piece.color === 'w'
                          ? '0 0 2px #000, 0 1px 3px rgba(0,0,0,0.8)'
                          : '0 0 1px rgba(255,255,255,0.3)',
                        filter: isCapture ? 'brightness(0.7)' : 'none',
                      }}
                    >
                      {getPieceSymbol(piece)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button
        onClick={reset}
        className="mt-5 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm font-medium"
      >
        New Game
      </button>
    </div>
  );
}
