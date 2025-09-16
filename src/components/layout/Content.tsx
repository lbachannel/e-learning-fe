'use client';

const ContentLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) => {
    return (
        <div id="content" className="container content">
            {children}
        </div>
    )
}

export default ContentLayout;