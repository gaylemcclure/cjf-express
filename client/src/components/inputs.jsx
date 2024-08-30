// import { quatrocento } from "../fonts";

// export function ValueTextInput(props: {label:string, id: string, txtname:string, change:any, value:string}) {
//     return (
//         <div>
//           <label className={`${quatrocento.className} block text-sm font-medium leading-6 text-gray-900`}>{props.label}<span className="text-red">*</span></label>
//           <input type="tel" required id={props.id} name={props.txtname} onChange={props.change} value={props.value} className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//         </div>
//       );
// }

// export function TextInput(props: {label:string, id: string, txtname:string, change:any}) {
//   return (
//       <div>
//         <label className={`${quatrocento.className} block text-sm font-medium leading-6 text-gray-900`}>{props.label}</label>
//         <input type="tel" required id={props.id} name={props.txtname} onChange={props.change} className="block w-full rounded-md mb-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//       </div>
//     );
// }

// export function PhoneInput(props: {label: string, id: string, phonename: string, change: any}) {
//   return (
//     <div>
//       <label className={`${quatrocento.className} block text-sm font-medium leading-6 text-gray-900`}>{props.label}</label>
//       <input type="tel" required id={props.id} name={props.phonename} onChange={props.change} className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
//     </div>
//   );
// }

// export function EmailInput(props: {label:string, id: string, emlname:string, change:any}) {
//     return (
//         <div>
//           <label className={`${quatrocento.className} block text-sm font-medium leading-6 text-gray-900`}>{props.label}</label>
//           <input type="tel" required id={props.id} name={props.emlname} onChange={props.change}  className="block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
//         </div>
//       );
// }

// export function SelectInput(props: {label:string, change:any, options:any}) {
//     return (
//         <div>
//           <label className={`${quatrocento.className} block text-sm font-medium leading-6 text-gray-900`}>{props.label}</label>
//           <select onChange={(e) => props.change(e)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 mb-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
//             {props.options.map((op:any) => (
//               <option key={op.value} value={op.value}>{op.value}</option>
//             ))}
//           </select>
//         </div>
//       );
// }

// export function MultiSelectInput(props: {label:string, change:any, options:any}) {
//   return (
//     <div>
//       <label className="block text-sm font-medium leading-6 text-gray-900">{props.label}</label>
//       <select multiple onChange={(e) => props.change(e)} className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
//         {props.options.map((op:any) => (
//           <option key={op.value} value={op.value}>{op.value}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export function LargeTextInput() {}

// export function UploadInput() {}
