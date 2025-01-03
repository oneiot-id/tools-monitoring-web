import { IDataHistory } from "../types/IDataHistory";
import { IMonitoringData } from "../types/IMonitoringData";

export const dummydata: IMonitoringData[] = [
  {
    timestamp: new Date('2024-12-01T08:00:00'),  // December 1, 2024, 08:00 AM
    value: 1,
  },
  {
    timestamp: new Date('2024-12-01T09:00:00'),  // December 1, 2024, 09:00 AM
    value: 2,
  },
  {
    timestamp: new Date('2024-12-02T10:00:00'),  // December 2, 2024, 10:00 AM
    value: 3,
  },
  {
    timestamp: new Date('2024-12-02T11:00:00'),  // December 2, 2024, 11:00 AM
    value: 2.1,
  },
  {
    timestamp: new Date('2024-12-03T12:00:00'),  // December 3, 2024, 12:00 PM
    value: 4,
  },
  {
    timestamp: new Date('2024-12-03T13:30:00'),  // December 3, 2024, 13:30 PM
    value: 1.5,
  },
  {
    timestamp: new Date('2024-12-04T15:00:00'),  // December 4, 2024, 03:00 PM
    value: 2.8,
  },
  {
    timestamp: new Date('2024-12-05T16:00:00'),  // December 5, 2024, 04:00 PM
    value: 3.5,
  },
  {
    timestamp: new Date('2024-12-05T16:00:00'),  // December 5, 2024, 04:00 PM
    value: 3.5,
  },
  {
    timestamp: new Date('2024-12-05T16:00:00'),  // December 5, 2024, 04:00 PM
    value: 3.5,
  },
  {
    timestamp: new Date('2024-12-05T16:00:00'),  // December 5, 2024, 04:00 PM
    value: 3.5,
  },
  {
    timestamp: new Date('2024-12-05T16:00:00'),  // December 5, 2024, 04:00 PM
    value: 3.5,
  },
];

export const dummydata2: IDataHistory[] = [
  {
    timestamp: new Date('2024-12-01T08:00:00'), // December 1, 2024, 08:00 AM
    value: 1,
    suffix: ""
  },
  {
    timestamp: new Date('2024-12-01T09:00:00'),  // December 1, 2024, 09:00 AM
    value: 2,
    suffix: ""
  },
  {
    timestamp: new Date('2024-12-02T10:00:00'),  // December 2, 2024, 10:00 AM
    value: 3,
    suffix: ""
  },
  {
    timestamp: new Date('2024-12-02T11:00:00'),  // December 2, 2024, 11:00 AM
    value: 2.1,
    suffix: ""
  },
  {
    timestamp: new Date('2024-12-03T12:00:00'),  // December 3, 2024, 12:00 PM
    value: 4,
    suffix: ""
  },
  {
    timestamp: new Date('2024-12-03T13:30:00'),  // December 3, 2024, 13:30 PM
    value: 1.5,
    suffix: ""
  },
  {
    timestamp: new Date('2024-12-04T15:00:00'),  // December 4, 2024, 03:00 PM
    value: 2.8,
    suffix: ""
  },
  {
    timestamp: new Date('2024-12-05T16:00:00'),  // December 5, 2024, 04:00 PM
    value: 3.5,
    suffix: ""
  },
];

// export const alarmdummy: IAlarmData[] = [
//   {
//     timestamp: new Date('2024-12-01T08:15:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Ok",
//     description: "Nilai tegangan stabil di 14V."
//   },
//   {
//     timestamp: new Date('2024-12-01T09:45:00'),
//     alarm: "Tegangan DC 5V",
//     type: "Danger",
//     description: "Tegangan mendekati batas minimum 4.5V."
//   },
//   {
//     timestamp: new Date('2024-12-02T10:30:00'),
//     alarm: "Tegangan AC 220V",
//     type: "Warning",
//     description: "Fluktuasi terdeteksi pada tegangan AC."
//   },
//   {
//     timestamp: new Date('2024-12-02T11:50:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Warning",
//     description: "Mendekati threshold minimum 13.5V."
//   },
//   {
//     timestamp: new Date('2024-12-03T08:20:00'),
//     alarm: "Tegangan DC 5V",
//     type: "Danger",
//     description: "Nilai di bawah batas aman 4.2V."
//   },
//   {
//     timestamp: new Date('2024-12-03T09:40:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Ok",
//     description: "Nilai stabil di atas 13.7V."
//   },
//   {
//     timestamp: new Date('2024-12-03T12:10:00'),
//     alarm: "Tegangan AC 220V",
//     type: "Warning",
//     description: "Fluktuasi mendekati 210V."
//   },
//   {
//     timestamp: new Date('2024-12-04T13:25:00'),
//     alarm: "Tegangan DC 5V",
//     type: "Warning",
//     description: "Tegangan mendekati batas bawah."
//   },
//   {
//     timestamp: new Date('2024-12-05T14:50:00'),
//     alarm: "Tegangan AC 220V",
//     type: "Danger",
//     description: "Fluktuasi besar terdeteksi."
//   },
//   {
//     timestamp: new Date('2024-12-05T16:35:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Ok",
//     description: "Sistem beroperasi normal."
//   },
//   {
//     timestamp: new Date('2024-12-06T08:45:00'),
//     alarm: "Tegangan DC 5V",
//     type: "Warning",
//     description: "Tegangan hampir mencapai batas bawah."
//   },
//   {
//     timestamp: new Date('2024-12-07T09:30:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Ok",
//     description: "Parameter stabil saat ini."
//   },
//   {
//     timestamp: new Date('2024-12-07T11:15:00'),
//     alarm: "Tegangan AC 220V",
//     type: "Danger",
//     description: "Fluktuasi besar terdeteksi pada tegangan AC."
//   },
//   {
//     timestamp: new Date('2024-12-08T10:10:00'),
//     alarm: "Tegangan DC 5V",
//     type: "Danger",
//     description: "Nilai turun di bawah 4V."
//   },
//   {
//     timestamp: new Date('2024-12-08T13:40:00'),
//     alarm: "Tegangan AC 220V",
//     type: "Warning",
//     description: "Gangguan minor pada jaringan listrik."
//   },
//   {
//     timestamp: new Date('2024-12-09T15:20:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Ok",
//     description: "Nilai stabil tanpa fluktuasi."
//   },
//   {
//     timestamp: new Date('2024-12-10T08:10:00'),
//     alarm: "Tegangan DC 5V",
//     type: "Warning",
//     description: "Nilai tegangan mendekati batas bawah 4.5V."
//   },
//   {
//     timestamp: new Date('2024-12-10T09:50:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Danger",
//     description: "Melebihi batas atas 15V."
//   },
//   {
//     timestamp: new Date('2024-12-11T11:00:00'),
//     alarm: "Tegangan AC 220V",
//     type: "Warning",
//     description: "Fluktuasi terdeteksi pada 230V."
//   },
//   {
//     timestamp: new Date('2024-12-11T12:45:00'),
//     alarm: "Tegangan DC 5V",
//     type: "Ok",
//     description: "Nilai stabil di 5V."
//   },
//   {
//     timestamp: new Date('2024-12-12T14:30:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Ok",
//     description: "Sistem dalam kondisi normal."
//   },
//   {
//     timestamp: new Date('2024-12-12T15:55:00'),
//     alarm: "Tegangan AC 220V",
//     type: "Danger",
//     description: "Nilai melebihi 250V."
//   },
//   {
//     timestamp: new Date('2024-12-13T08:20:00'),
//     alarm: "Tegangan DC 5V",
//     type: "Warning",
//     description: "Tegangan hampir mencapai batas bawah."
//   },
//   {
//     timestamp: new Date('2024-12-14T10:35:00'),
//     alarm: "Tegangan DC 14V",
//     type: "Danger",
//     description: "Turun di bawah 13V."
//   },
//   {
//     timestamp: new Date('2024-12-14T12:15:00'),
//     alarm: "Tegangan AC 220V",
//     type: "Ok",
//     description: "Nilai stabil di 220V."
//   },
// ];
