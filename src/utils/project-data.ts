type ProjectData = Record<string, number>;
interface GivenItem {
  [date: string]: ProjectData;
}
interface WantedItem {
  date: string;
  [project: string]: number | string;
}
export default function convertGivenToWanted(given: any): WantedItem[] {
  if (!given) {
    throw new Error("No data provided");
  }
  return given.map((item: GivenItem) => {
    const date: string = Object.keys(item)[0];
    const projects: ProjectData = item[date];
    const transformedItem: WantedItem = {
      date,
      ...projects,
    };
    return transformedItem;
  });
}
// Example usage
// const given: GivenItem[] = [
//   {
//     '20/10/2002': {
//       'project1': 1,
//       'project2': 0.5
//     }
//   },
//   {
//     '22/10/2002': {
//       'project3': 5,
//     }
//   }
// ];
// const wanted: WantedItem[] = convertGivenToWanted(given);
// console.log(wanted);
