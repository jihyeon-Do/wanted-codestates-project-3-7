const newId = () => {
  const board = {};

  return () => {
    let id = Date.now().toString(36) + Math.random().toString(36).substring(2);

    while (board[id]) {
      id = Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    board[id] = true;
    console.log(board);
    return id;
  };
};

export const makeUniqueId = newId();
