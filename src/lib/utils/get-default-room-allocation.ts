type Guest = {
  adult: number;
  child: number;
}

type Room = {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number; // 分配人數的上限
}

type DefaultRoom = {
  adult: number;
  child: number;
  price: number;
}


  // 必須找出最低價格的房間陣列組合
  // 有 child 的 room 至少要有一個 adult 分配在同一間 room，每個房間都有基礎的 roomPrice 和分配人數上限的 capacity
  // 每分配一個 adult 或 child 都會加上對應的 adultPrice 或 childPrice，所以每間
  // 房價格為 roomPrice + adultPrice*adult + childPrice*child
  // 請找出最低的 totalPrice，如無法分配則 totalPrice 為 0
  // 請實作此函式
  // 以下為test case 
  // const guest = { adult: 4, child: 2 }
  // const rooms = [
  // { roomPrice: 1000, adultPrice: 200, childPrice: 100, capacity: 4 }, 
  // { roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
  // { roomPrice: 500, adultPrice: 300, childPrice: 200, capacity: 4 },
  // ]
  // getDefaultRoomAllocation(guest, rooms) => [{ adult: 4, child: 2, price: 3600 }]
export const getDefaultRoomAllocation = (
  guest: Guest,
  rooms: Room[]
): DefaultRoom[] => {
  
  const { adult, child } = guest;

  function helper(remainingAdults: number, remainingChildren: number, roomIndex: number) {
    if (roomIndex === rooms.length) {
      if (remainingAdults === 0 && remainingChildren === 0) {
        return { totalPrice: 0, allocation: [] };
      }
      return { totalPrice: Infinity, allocation: [] };
    }

    const { roomPrice, adultPrice, childPrice, capacity } = rooms[roomIndex];
    let minResult = { totalPrice: Infinity, allocation: []as DefaultRoom[]} ;

    for (let a = 0; a <= remainingAdults; a++) {
      for (let c = 0; c <= remainingChildren; c++) {
        if (a + c > capacity) break;
        if (c > 0 && a === 0) continue;

        const price = roomPrice + a * adultPrice + c * childPrice;
        const subResult = helper(remainingAdults - a, remainingChildren - c, roomIndex + 1);
        
        const total = price + subResult.totalPrice;
        if (total < minResult.totalPrice) {
          minResult.totalPrice = total;
          minResult.allocation = [{ adult: a, child: c, price }].concat(subResult.allocation);
        }
      }
    }

    return minResult;
  }

  const result = helper(adult, child, 0);
  return result.totalPrice === Infinity ? [] : result.allocation;
}

