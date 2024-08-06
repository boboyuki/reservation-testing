'use client';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { CustomInputNumber } from './custom-input-number';
import { getDefaultRoomAllocation } from '@/lib/utils/get-default-room-allocation';
import { Alert } from '@/components/ui/alert';

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

type RoomResult = {
  adult: number;
  child: number;
  price: number;
};

type Props = {
  guest: Guest;
  rooms: Room[];
  onChange: (result: RoomResult[]) => void;
};
export const RoomAllocation = ({ guest, rooms, onChange }: Props) => {
  const [roomResult, setRoomResult] = useState<RoomResult[]>(
    getDefaultRoomAllocation(guest, rooms),
  );

  const step = 1;

  const roomTotal = roomResult.length;

  const notAssignQuest = useMemo(() => {
    const totalAdult = roomResult.reduce((acc, room) => {
      return acc + room.adult;
    }, 0);

    const totalChild = roomResult.reduce((acc, room) => {
      return acc + room.child;
    }, 0);

    return {
      adult: guest.adult - totalAdult,
      child: guest.child - totalChild,
    };
  }, [guest.adult, guest.child, roomResult]);

  const currentAssignQuest = useMemo(() => {
    const totalAdult = roomResult.reduce((acc, room) => {
      return acc + room.adult;
    }, 0);

    const totalChild = roomResult.reduce((acc, room) => {
      return acc + room.child;
    }, 0);

    return {
      adult: totalAdult,
      child: totalChild,
    };
  }, [roomResult]);

  const handleChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(e);
    const [index, type, action] = e.currentTarget.name.split('-');
    if (!index || !type || !action) {
      return;
    }
    if (type !== 'adult' && type !== 'child') {
      return;
    }
    // check decrease or increase or input
    const newRoomResult = roomResult.map((room, i) => {
      if (i === Number(index)) {
        // 檢查是否超過房間容量
        if (action === 'decrease' && currentAssignQuest[type] - step >= 0) {
          return {
            ...room,
            // 未分配的人數大於等於0時，才能減少
            [type]: room[type] - step,
          };
        } else if (action === 'increase' && currentAssignQuest[type] + step <= guest[type]) {
          return {
            ...room,
            // 未分配的人數大於0時，才能增加
            [type]: room[type] + step,
          };
        } else if (
          action === 'input' &&
          Number((e.target as HTMLInputElement).value) >= 0 &&
          currentAssignQuest[type] - room[type] + Number((e.target as HTMLInputElement).value) <=
            guest[type]
        ) {
          return {
            ...room,
            [type]: Number((e.target as HTMLInputElement).value),
          };
        }
      }
      return room;
    });

    setRoomResult(newRoomResult);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLButtonElement, Element>,
  ) => {
    console.log(e);
  };

  useEffect(() => {
    onChange(roomResult); //目前console.log 不影響
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomResult]);

  return (
    <div className="flex h-full w-full flex-col justify-center p-2">
      <h2 className="text-left text-xl font-[900]">
        住客人數: {guest.adult} 大人, {guest.child} 小孩 / {roomTotal} 房
      </h2>
      {notAssignQuest.adult > 0 || notAssignQuest.child > 0 ? (
        <Alert className="my-5 border-[#1D9FD2] bg-[#9ED1E9] opacity-50">
          <p>
            尚未分配的人數: {notAssignQuest.adult} 大人, {notAssignQuest.child} 小孩
          </p>
        </Alert>
      ) : null}
      {roomResult.map((room, index) => {
        return (
          <div
            className="flex w-full flex-col gap-5 border-b-2"
            key={`room-${index}-${room.adult}-${room.child}`}
          >
            <h3 className="my-3 text-left font-[700]">房間: {room.adult + room.child} 人</h3>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p>大人: {room.adult} 人</p>
                <p className="text-gray-400">年齡 20 +</p>
              </div>
              <CustomInputNumber
                min={0}
                max={guest.adult}
                step={step}
                name={`${index}-adult`}
                value={room.adult}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={false}
              ></CustomInputNumber>
            </div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p>小孩: {room.child} 人</p>
              </div>
              <CustomInputNumber
                min={0}
                max={guest.child}
                step={step}
                name={`${index}-child`}
                value={room.child}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={false}
              ></CustomInputNumber>
            </div>
          </div>
        );
      })}
    </div>
  );
};
