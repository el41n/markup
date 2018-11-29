export class File {
  pk: number;
  title: string;
  text: string;
  author: string;
}

export class FilePermission {
  read = "r_file";
  readWrite = "rw_file";
}
