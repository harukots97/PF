import { useState, useCallback } from 'react';

export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
export type Color = 'w' | 'b';
export interface Piece { type: PieceType; color: Color }
export type Board = (Piece | null)[][];
export type Square = [number, number]; // [row, col]

function initBoard(): Board {
  const b: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  const backRank: PieceType[] = ['r','n','b','q','k','b','n','r'];
  backRank.forEach((t, c) => {
    b[0][c] = { type: t, color: 'b' };
    b[7][c] = { type: t, color: 'w' };
  });
  for (let c = 0; c < 8; c++) {
    b[1][c] = { type: 'p', color: 'b' };
    b[6][c] = { type: 'p', color: 'w' };
  }
  return b;
}

function inBounds(r: number, c: number) { return r >= 0 && r < 8 && c >= 0 && c < 8; }

function slidingMoves(board: Board, r: number, c: number, dirs: [number,number][], color: Color): Square[] {
  const moves: Square[] = [];
  for (const [dr, dc] of dirs) {
    let nr = r + dr, nc = c + dc;
    while (inBounds(nr, nc)) {
      const target = board[nr][nc];
      if (!target) { moves.push([nr, nc]); }
      else { if (target.color !== color) moves.push([nr, nc]); break; }
      nr += dr; nc += dc;
    }
  }
  return moves;
}

function rawMoves(board: Board, r: number, c: number): Square[] {
  const piece = board[r][c];
  if (!piece) return [];
  const { type, color } = piece;
  const moves: Square[] = [];
  const dir = color === 'w' ? -1 : 1;

  if (type === 'p') {
    const nr = r + dir;
    if (inBounds(nr, c) && !board[nr][c]) {
      moves.push([nr, c]);
      const startRow = color === 'w' ? 6 : 1;
      if (r === startRow && !board[r + 2*dir][c]) moves.push([r + 2*dir, c]);
    }
    for (const dc of [-1, 1]) {
      if (inBounds(nr, c + dc) && board[nr][c + dc]?.color !== color && board[nr][c + dc]) {
        moves.push([nr, c + dc]);
      }
    }
  } else if (type === 'r') {
    return slidingMoves(board, r, c, [[0,1],[0,-1],[1,0],[-1,0]], color);
  } else if (type === 'b') {
    return slidingMoves(board, r, c, [[1,1],[1,-1],[-1,1],[-1,-1]], color);
  } else if (type === 'q') {
    return slidingMoves(board, r, c, [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]], color);
  } else if (type === 'n') {
    for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
      const nr = r+dr, nc = c+dc;
      if (inBounds(nr,nc) && board[nr][nc]?.color !== color) moves.push([nr,nc]);
    }
  } else if (type === 'k') {
    for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
      const nr = r+dr, nc = c+dc;
      if (inBounds(nr,nc) && board[nr][nc]?.color !== color) moves.push([nr,nc]);
    }
  }
  return moves;
}

function findKing(board: Board, color: Color): Square | null {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c]?.type === 'k' && board[r][c]?.color === color) return [r, c];
  return null;
}

function isInCheck(board: Board, color: Color): boolean {
  const king = findKing(board, color);
  if (!king) return true;
  const opp = color === 'w' ? 'b' : 'w';
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++)
      if (board[r][c]?.color === opp)
        if (rawMoves(board, r, c).some(([mr, mc]) => mr === king[0] && mc === king[1])) return true;
  return false;
}

function applyMove(board: Board, from: Square, to: Square): Board {
  const next = board.map(row => [...row]);
  next[to[0]][to[1]] = next[from[0]][from[1]];
  next[from[0]][from[1]] = null;
  return next;
}

function legalMoves(board: Board, r: number, c: number): Square[] {
  const piece = board[r][c];
  if (!piece) return [];
  return rawMoves(board, r, c).filter(([tr, tc]) => {
    const next = applyMove(board, [r, c], [tr, tc]);
    return !isInCheck(next, piece.color);
  });
}

const SYMBOLS: Record<string, string> = {
  'wp':'♙','bp':'♟','wr':'♖','br':'♜','wn':'♘','bn':'♞','wb':'♗','bb':'♝','wq':'♕','bq':'♛','wk':'♔','bk':'♚'
};

export function getPieceSymbol(piece: Piece): string {
  return SYMBOLS[`${piece.color}${piece.type}`] ?? '';
}

export interface ChessState {
  board: Board;
  turn: Color;
  selected: Square | null;
  validMoves: Square[];
  status: string;
}

export function useChess() {
  const [state, setState] = useState<ChessState>({
    board: initBoard(),
    turn: 'w',
    selected: null,
    validMoves: [],
    status: "White's turn",
  });

  const selectOrMove = useCallback((r: number, c: number) => {
    setState(prev => {
      const { board, turn, selected, validMoves } = prev;

      // If a piece is selected and this is a valid move square
      if (selected && validMoves.some(([mr, mc]) => mr === r && mc === c)) {
        const next = applyMove(board, selected, [r, c]);
        const opp = turn === 'w' ? 'b' : 'w';
        const oppInCheck = isInCheck(next, opp);
        const oppHasMoves = Array.from({length: 8}, (_, row) =>
          Array.from({length: 8}, (_, col) => legalMoves(next, row, col))
        ).flat().some(m => m.length > 0);

        let status: string;
        if (oppInCheck && !oppHasMoves) status = `Checkmate! ${turn === 'w' ? 'White' : 'Black'} wins!`;
        else if (!oppHasMoves) status = 'Stalemate!';
        else if (oppInCheck) status = `Check! ${opp === 'w' ? "White's" : "Black's"} turn`;
        else status = `${opp === 'w' ? "White's" : "Black's"} turn`;

        return { board: next, turn: opp, selected: null, validMoves: [], status };
      }

      // Select a piece
      const piece = board[r][c];
      if (piece && piece.color === turn) {
        const moves = legalMoves(board, r, c);
        return { ...prev, selected: [r, c], validMoves: moves };
      }

      return { ...prev, selected: null, validMoves: [] };
    });
  }, []);

  const reset = useCallback(() => {
    setState({ board: initBoard(), turn: 'w', selected: null, validMoves: [], status: "White's turn" });
  }, []);

  return { state, selectOrMove, reset };
}
