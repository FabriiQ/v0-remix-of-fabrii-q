'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Tables } from '@/types/supabase';

type Role = Tables<'roles'>;
type Permission = Tables<'permissions'>;
type RolePermission = Tables<'role_permissions'>;

export default function RolesManagementPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: rolesData, error: rolesError } = await supabase.from('roles').select('*');
    const { data: permissionsData, error: permissionsError } = await supabase.from('permissions').select('*');
    const { data: rolePermissionsData, error: rolePermissionsError } = await supabase.from('role_permissions').select('*');

    if (rolesError || permissionsError || rolePermissionsError) {
      console.error('Error fetching data:', rolesError || permissionsError || rolePermissionsError);
      toast({ title: 'Error', description: 'Failed to load roles and permissions.', variant: 'destructive' });
    } else {
      setRoles(rolesData || []);
      setPermissions(permissionsData || []);
      setRolePermissions(rolePermissionsData || []);
    }
    setLoading(false);
  }, [supabase, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePermissionChange = async (roleId: number, permissionId: number, checked: boolean) => {
    if (checked) {
      // Add permission to role
      const { error } = await supabase.from('role_permissions').insert({ role_id: roleId, permission_id: permissionId });
      if (error) {
        toast({ title: 'Error', description: `Failed to add permission: ${error.message}`, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Permission added successfully.' });
        fetchData();
      }
    } else {
      // Remove permission from role
      const { error } = await supabase.from('role_permissions').delete().match({ role_id: roleId, permission_id: permissionId });
       if (error) {
        toast({ title: 'Error', description: `Failed to remove permission: ${error.message}`, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Permission removed successfully.' });
        fetchData();
      }
    }
  };

  if (loading) {
    return <div>Loading roles and permissions...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Roles and Permissions Management</h1>
      <div className="space-y-6">
        {roles.map(role => (
          <Card key={role.id}>
            <CardHeader>
              <CardTitle>{role.name}</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Permissions</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {permissions.map(permission => {
                  const hasPermission = rolePermissions.some(rp => rp.role_id === role.id && rp.permission_id === permission.id);
                  return (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role.id}-perm-${permission.id}`}
                        checked={hasPermission}
                        onCheckedChange={(checked) => handlePermissionChange(role.id, permission.id, !!checked)}
                      />
                      <label
                        htmlFor={`role-${role.id}-perm-${permission.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}