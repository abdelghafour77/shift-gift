// src/hooks/useLogout.ts
import { useCallback } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../store/globalStore";
import { useAuthStore } from "../../Login/store/authStore";

export function useBackOfficeLogout() {
  const logoutAuth = useAuthStore((s) => s.backOfficeLogout);
  const clearGlobal = useGlobalStore((s) => s.clear);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useCallback(async () => {
    navigate("/");
    logoutAuth();
    clearGlobal();
    localStorage.clear();
    queryClient.clear();
  }, [logoutAuth, clearGlobal, queryClient, navigate]);
}
