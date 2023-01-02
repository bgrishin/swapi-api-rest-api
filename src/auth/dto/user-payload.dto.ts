import { Roles } from '../types/role.enum';

export class UserPayload {
  username: string;
  roles: Roles[];
  sub: string;
}
