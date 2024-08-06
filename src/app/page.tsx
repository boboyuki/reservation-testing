'use client';
import { RoomAllocation } from './components/room-allocation';

export default function Home() {
  return (
    <div className="mx-auto flex h-screen w-[600px]">
      <RoomAllocation
        guest={{ adult: 4, child: 2 }}
        rooms={[
          { roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 4 },
          { roomPrice: 2000, adultPrice: 1000, childPrice: 600, capacity: 2 },
          { roomPrice: 3000, adultPrice: 1500, childPrice: 900, capacity: 3 },
        ]}
        onChange={(result) => {
          console.log(result);
        }}
      ></RoomAllocation>
    </div>
  );
}
