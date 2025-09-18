import VerifyComponent from "@/components/auth/VerifyComponent";

const VerifyPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    return (
        <VerifyComponent id={id} />
    )
}

export default VerifyPage;