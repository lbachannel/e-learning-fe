// import VerifyComponent from "@/components/auth/VerifyComponent";
// import { Metadata } from 'next';

// interface VerifyPageProps {
//     params: {
//         id: string;
//     };
// }

// export const generateMetadata = ({ params }: VerifyPageProps): Metadata => {
//     return {
//         title: `Verify ${params.id}`,
//     };
// };

// const VerifyPage = ({ params }: VerifyPageProps) => {
//     const { id } = params;
//     return (
//         <VerifyComponent id={id} />
//     )
// }

// export default VerifyPage;


// app/verify/[id]/page.tsx
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

const TestComponent = dynamic(() => import('@/components/auth/VerifyComponent'), {
  ssr: false, // Tắt Server-Side Rendering
});

interface VerifyPageProps {
  params: { id: string };
}

const VerifyPage = ({ params }: VerifyPageProps) => {
  const { id } = params;
  return <TestComponent />;
};

export default VerifyPage;