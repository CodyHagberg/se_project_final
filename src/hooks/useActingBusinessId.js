import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export const ACTING_BUSINESS_STORAGE_KEY = "adminActingBusinessId";
export const ACTING_COMPANY_STORAGE_KEY = "adminActingCompanyName";

/**
 * When an admin opens the dashboard with ?businessId=<tenantMongoId>,
 * remember it in sessionStorage so navigation between /dashboard/* routes
 * keeps working without repeating the query param everywhere.
 */
export function useActingBusinessId() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const isAdmin = user?.role === "admin";

  const fromUrl = searchParams.get("businessId");

  useEffect(() => {
    if (!isAdmin || !fromUrl) return;
    try {
      sessionStorage.setItem(ACTING_BUSINESS_STORAGE_KEY, fromUrl);
    } catch {
      /* ignore */
    }
  }, [isAdmin, fromUrl]);

  const actingBusinessId = useMemo(() => {
    if (!isAdmin) return null;
    try {
      return fromUrl || sessionStorage.getItem(ACTING_BUSINESS_STORAGE_KEY) || null;
    } catch {
      return fromUrl || null;
    }
  }, [isAdmin, fromUrl]);

  const actingCompanyName = useMemo(() => {
    if (!isAdmin || !actingBusinessId) return null;
    try {
      return sessionStorage.getItem(ACTING_COMPANY_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  }, [isAdmin, actingBusinessId]);

  const setActingTenant = (businessId, companyName) => {
    if (!isAdmin) return;
    try {
      if (businessId) sessionStorage.setItem(ACTING_BUSINESS_STORAGE_KEY, businessId);
      else sessionStorage.removeItem(ACTING_BUSINESS_STORAGE_KEY);
      if (companyName) sessionStorage.setItem(ACTING_COMPANY_STORAGE_KEY, companyName);
      else sessionStorage.removeItem(ACTING_COMPANY_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const clearActingTenant = () => {
    try {
      sessionStorage.removeItem(ACTING_BUSINESS_STORAGE_KEY);
      sessionStorage.removeItem(ACTING_COMPANY_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return {
    actingBusinessId,
    actingCompanyName,
    isAdminActing: isAdmin && !!actingBusinessId,
    setActingTenant,
    clearActingTenant,
  };
}
