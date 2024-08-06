// write test use vitest
import { describe, it, expect, test } from 'vitest';
import { getDefaultRoomAllocation } from './get-default-room-allocation';

const getRoomTotalPrice = (roomDetails: any) =>
  roomDetails.reduce((acc: any, val: any) => acc + val.price, 0);

const getRes = (guest: any, rooms: any) =>
  getRoomTotalPrice(getDefaultRoomAllocation(guest, rooms));

describe('getDefaultRoomAllocation function', () => {
  test('case 1', () => {
    const guest = { adult: 4, child: 2 };
    const rooms = [
      { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
    ];

    const result = getRes(guest, rooms);
    expect(result).toEqual(2600);
  });

  test('case 2', () => {
    const guest = { adult: 7, child: 3 };
    const rooms = [
      { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 2000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
      { roomPrice: 2000, adultPrice: 400, childPrice: 200, capacity: 2 },
    ];

    const result = getRes(guest, rooms);
    expect(result).toEqual(8000);
  });

  test('case 3', () => {
    const guest = { adult: 16, child: 0 };
    const rooms = [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ];

    const result = getRes(guest, rooms);
    expect(result).toEqual(9000);
  });

  test('case 4', () => {
    const guest = { adult: 0, child: 1 }
    const rooms = [
        { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
        { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
        { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
        { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
    ]

    const result = getRes(guest, rooms);
    expect(result).toEqual(0);
});
});
