type Guest = {
  adult: number;
  child: number;
};

type Room = {
  roomPrice: number;
  adultPrice: number;
  childPrice: number;
  capacity: number; // 分配人數的上限
};

type DefaultRoom = {
  adult: number;
  child: number;
  price: number;
};

export const getDefaultRoomAllocation = (guest: Guest, rooms: Room[]): DefaultRoom[] => {
  let bestAllocation: DefaultRoom[] = [];
  let minTotalPrice = Infinity; // 最小價格設定為無限大

  function allocate(remainingGuests: Guest, currentAllocation: DefaultRoom[], roomIndex: number) {
    // 如果所有人都分配完畢，則計算價格
    if (remainingGuests.adult === 0 && remainingGuests.child === 0) {
      const totalPrice = currentAllocation.reduce((sum, room) => sum + room.price, 0);
      if (totalPrice < minTotalPrice) {
        minTotalPrice = totalPrice;
        bestAllocation = structuredClone(currentAllocation);
        console.log('bestAllocation', bestAllocation);
      }
      return;
    }

    if (roomIndex >= rooms.length) return;

    const room = rooms[roomIndex];
    
    for (let adults = 0; adults <= remainingGuests.adult; adults++) {
      for (let children = 0; children <= remainingGuests.child; children++) {
        if (adults + children > room.capacity || (children > 0 && adults === 0)) continue;

        const newRoom: DefaultRoom = {
          adult: adults,
          child: children,
          price: room.roomPrice + adults * room.adultPrice + children * room.childPrice,
        };
        
        allocate(
          { adult: remainingGuests.adult - adults, child: remainingGuests.child - children },
          [...currentAllocation, newRoom],
          roomIndex + 1,
        );
      }
    }

    allocate(remainingGuests, currentAllocation, roomIndex + 1);
  }

  allocate(guest, [], 0);

  return bestAllocation.length > 0 ? bestAllocation : [{ adult: 0, child: 0, price: 0 }];
};
