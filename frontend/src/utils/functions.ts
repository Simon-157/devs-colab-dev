export async function copyRoomId(roomId:string, toast: { success: (arg0: string) => void; error: (arg0: string) => void; }) {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }


