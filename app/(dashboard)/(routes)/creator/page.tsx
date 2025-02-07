import { checkRole } from '@/utils/roles';
const CreatorPage = async function () {
  const isAdmin = await checkRole('admin');
  return (
    <>
      {
        isAdmin && (
          <p>Admin is logged in.</p>
        )
      }
      <div className="h-[640px] w-full flex flex-col align-middle shadow-sm justify-center">
        CREATOR PAGE
      </div>
    </>
  );
}

export default CreatorPage;