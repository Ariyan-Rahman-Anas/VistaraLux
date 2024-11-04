import { useEffect } from "react";
import { toast } from "sonner";
import { MutationTrigger, MutationResult } from "@reduxjs/toolkit/query/react"; // Import types if using TypeScript

type UseDeleteHandlerOptions = {
    deleteAction: MutationTrigger<any>; // Function to trigger delete mutation
    deleteData: MutationResult<any>; // Delete mutation result
};

export const useDeleteHandler = ({ deleteAction, deleteData }: UseDeleteHandlerOptions) => {
    const { error, isSuccess, data } = deleteData;

    const handleDelete = async (id: string) => {
        try {
            await deleteAction(id);
        } catch (error) {
            toast.error("Failed to delete item", { duration: 3000 });
            console.error("Delete action failed:", error);
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error.data?.message || "Failed to delete item", { duration: 3000 });
        }

        if (isSuccess) {
            toast.success(data?.message || "Item deleted successfully", { duration: 4000 });
        }
    }, [error, isSuccess, data]);

    return { handleDelete };
};
