// write test use vitest
import { describe, it, expect } from 'vitest';
import { getDefaultRoomAllocation } from './get-default-room-allocation';

describe('getDefaultRoomAllocation', () => {
  it('should return [{ adult: 4, child: 2, price: 3600 }]', () => {
    const guest = { adult: 4, child: 2 }
    1000 + 200 * 2 + 100 * 2
    1000 * 2 + 260
    const rooms = [
      { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
      { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
    ]
    const defaultRooms = getDefaultRoomAllocation(guest, rooms)
    expect(defaultRooms).toEqual([{ adult: 4, child: 2, price: 3600 }])
  })

  
  it('should return [{ adult: 16, child: 0, price: 8000 }]', () => {
    const guest = { adult: 16, child: 0 }
    const rooms = [
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 }
    ]
    const defaultRooms = getDefaultRoomAllocation(guest, rooms)
    expect(defaultRooms).toEqual([{ adult: 16, child: 0, price: 8000 }])
  })

  it('should return []', () => {
    const guest = { adult: 0, child: 1 }
    const rooms = [
      { roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 2 },
      { roomPrice: 500, adultPrice: 400, childPrice: 300, capacity: 4 },
      { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
    ]
    const defaultRooms = getDefaultRoomAllocation(guest, rooms)
    expect(defaultRooms).toEqual([])
  })
})