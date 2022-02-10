import express from 'express';
import { ERROR_MESSAGE } from 'shared/constant';
import { TRoom } from 'shared/types';

const router = express.Router();

let roomId = 0;

export let rooms: Array<TRoom> = [];

router.post('/', (req, res) => {
  const { name } = req.body;

  if (rooms.find((room) => room.name === name)) {
    res.status(409).json({
      message: ERROR_MESSAGE.DUPLICATED_ROOM,
    });
  } else {
    rooms.push({
      id: roomId++,
      name,
      users: [],
    });

    res.status(201).json({ rooms });
  }
});

router.get('/', (req, res) => {
  res.json({ rooms });
});

export default router;
