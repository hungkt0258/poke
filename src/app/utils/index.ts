import { RoleConfig } from './constant';

export const GetRoleNumberWithUrlInPermission = (url, stateMapRole = null) => {
  if (!stateMapRole) {
    stateMapRole = RoleConfig.RolePermission;
  }
  for (const key in stateMapRole) {
    if (Object.prototype.hasOwnProperty.call(stateMapRole, key)) {
      const roles = stateMapRole[key];
      if (url.includes(key)) {
        return roles;
      }
    }
  }
  return null;
}

export const GetRoleStringWithUrlInPermission = (url, stateMapRole = null) => {
  if (!stateMapRole) {
    stateMapRole = RoleConfig.RolePermission;
  }
  for (const key in stateMapRole) {
    if (Object.prototype.hasOwnProperty.call(stateMapRole, key)) {
      const roles = stateMapRole[key];
      if (url.includes(key)) {
        let sRoles = [];
        roles.forEach(element => {
          sRoles.push(RoleConfig.RoleNumberMapRoleString[element])
        });
        return sRoles;
      }
    }
  }
  return null;
}

export const kFormatter = (num: number) => {
  const temp = +((Math.abs(num)/1000).toFixed(1));
  return Math.abs(num) > 999 ? Math.sign(num)*temp + 'k' : Math.sign(num)*Math.abs(num)
}