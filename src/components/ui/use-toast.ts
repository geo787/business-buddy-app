
/**
 * This file re-exports the toast functionality from the hooks directory
 * to maintain compatibility with existing code that imports from here.
 */
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
