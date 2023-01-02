import { SetMetadata } from '@nestjs/common';
import { Roles } from '../types/role.enum';

export const Role = (...roles: Roles[]) => SetMetadata('roles', roles);
