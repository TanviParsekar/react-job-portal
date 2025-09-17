import { useEffect, useState } from "react";
import { fetchDepartments, fetchLocations, fetchFunctions } from "../api/jobs";

export const useLookups = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [functions, setFunctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [dRes, lRes, fRes] = await Promise.all([
          fetchDepartments(),
          fetchLocations(),
          fetchFunctions(),
        ]);
        if (!mounted) return;
        //actual response shape — here we assume arrays or fields
        setDepartments(dRes.departments ?? dRes);
        setLocations(lRes.locations ?? lRes);
        setFunctions(fRes.functions ?? fRes);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { departments, locations, functions, loading };
};
