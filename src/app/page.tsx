'use client'
import { RoomAllocation } from "./components/room-allocation";

export default function Home() {
  return (<div className="flex mx-auto w-[600px] h-screen">
    <RoomAllocation 
      guest={{ adult: 2, child: 1 }}
      rooms={[
        { roomPrice: 1000, adultPrice: 500, childPrice: 300, capacity: 4 },
        { roomPrice: 2000, adultPrice: 1000, childPrice: 600, capacity: 2 },
        { roomPrice: 3000, adultPrice: 1500, childPrice: 900, capacity: 3 },
      ]}
      onChange={(result) => {
        console.log(result);
      }}
    ></RoomAllocation>
  </div> );
}
