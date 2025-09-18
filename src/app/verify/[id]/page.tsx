import VerifyComponent from "@/components/auth/VerifyComponent";

interface VerifyPageProps {
  params: {
    id: string;
  };
}

const VerifyPage = ({ params }: VerifyPageProps) => {
    const { id } = params;
    return (
        <VerifyComponent id={id} />
    )
}

export default VerifyPage;