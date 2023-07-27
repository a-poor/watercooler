import { describe, it, expect } from 'vitest';
import * as api from '@/api';

describe('user roles', () => {
    it('to text', () => {
        // Test regular functions for all role types...
        expect(api.userRoleFromTxt("user"))
            .toBe(api.UserRole.User);
        expect(api.userRoleFromTxt("Assistant"))
            .toBe(api.UserRole.Assistant);
        expect(api.userRoleFromTxt("FUNCTION"))
            .toBe(api.UserRole.Function);
        expect(api.userRoleFromTxt(" sYsTem "))
            .toBe(api.UserRole.System);

        // Test errors...
        expect(() => api.userRoleFromTxt("unknown"))
            .toThrowError()
        expect(() => api.userRoleFromTxt(""))
            .toThrowError()
    });

    it('from text', () => {
        // Test regular functions for all role types...
        expect(api.userRoleToTxt(api.UserRole.User))
            .toBe("User");
        expect(api.userRoleToTxt(api.UserRole.Assistant))
            .toBe("Assistant");
        expect(api.userRoleToTxt(api.UserRole.Function))
            .toBe("Function");
        expect(api.userRoleToTxt(api.UserRole.System))
            .toBe("System");

        // Test errors...
        expect(() => api.userRoleToTxt("unknown" as api.UserRole))
            .toThrowError()
        expect(() => api.userRoleToTxt("" as api.UserRole))
            .toThrowError()
    });
});
