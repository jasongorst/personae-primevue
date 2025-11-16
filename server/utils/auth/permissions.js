import { createAccessControl } from "better-auth/plugins/access"
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const ac = createAccessControl({
  ...defaultStatements,
  character: ["create", "update", "delete"]
})

export const user = ac.newRole({
  character: ["create", "update", "delete"]
})

export const admin = ac.newRole({
  character: ["create", "update", "delete"],
  ...adminAc.statements
})
