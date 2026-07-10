import { permissionRequestSchema } from '../../shared/contracts/capabilities'
import type { PermissionRequest } from '../../shared/contracts/capabilities'

export class PermissionService {
  public isAllowed(request: PermissionRequest): boolean {
    const parsed = permissionRequestSchema.safeParse(request)

    return parsed.success && parsed.data.capability === 'app.readInfo'
  }
}
