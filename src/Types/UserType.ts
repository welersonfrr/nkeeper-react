import NoteType from "./NoteType";

interface UserType {
  user: string;
  password: string;
  salt: string;
  notes: Array<NoteType>;
}

export default UserType;
