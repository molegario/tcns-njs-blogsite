import Image from 'next/image';

export const Logo = () => {

  return (
    <Image 
      height={51}
      width={130}
      alt="logo"
      src="/logo.png"
      loading='eager'
    />
  );
};