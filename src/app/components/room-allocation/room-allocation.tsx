'use client'
import { ChangeEvent, useState } from 'react';
import { CustomInputNumber } from './custom-input-number';
import { getDefaultRoomAllocation } from '@/lib/utils/get-default-room-allocation';

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

type RoomResult = {
  adult: number;
  child: number;
  price: number;
}

type Props = {
  guest: Guest;
  rooms: Room[];
  onChange: (result: RoomResult) => void;
}
export const RoomAllocation = ({
  guest,
  rooms
}: Props) => {
  const [roomResult, setRoomResult] = useState<RoomResult[]>(
    getDefaultRoomAllocation(guest, rooms)
  );

  const roomTotal = roomResult.length


  const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e);
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLButtonElement, Element>) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div className="flex flex-col justify-center w-full h-full p-2">
      <h2 className='font-[900] text-xl text-left'>
        住客人數: {guest.adult} 大人, {guest.child} 小孩 / {roomTotal} 房
      </h2>
      {
        roomResult.map((room, index) => {
          return (
            <div className="flex w-full flex-col gap-5 border-b-2" key={index}>
              <h3 className='text-left font-[700] my-3'>房間: { room.adult + room.child } 人</h3>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p>大人: {room.adult} 人</p>
                  <p className='text-gray-400'>年齡 20 +</p>
                </div>
                <CustomInputNumber
                  min={0}
                  max={guest.adult}
                  step={1}
                  name="input-number"
                  value={room.adult}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={false}
                ></CustomInputNumber>
              </div>
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p>小孩: {room.child} 人</p>
                </div>
                <CustomInputNumber
                  min={0}
                  max={guest.child}
                  step={1}
                  name="input-number"
                  value={room.child}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={false}
                ></CustomInputNumber>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};