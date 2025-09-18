import VerifyComponent from "@/components/auth/VerifyComponent";
import { Metadata } from 'next';

interface VerifyPageProps {
    params: {
        id: string;
    };
}

export const generateMetadata = ({ params }: VerifyPageProps): Metadata => {
    return {
        title: `Verify ${params.id}`,
    };
};

const VerifyPage = ({ params }: VerifyPageProps) => {
    const { id } = params;
    return (
        <VerifyComponent id={id} />
    )
}

export default VerifyPage;