import Link from 'next/link';
import React from 'react';

const DropdownLink = (props) => {
    let {href, children, ...rest} = props;
    return (
        <Link href={href}>
            <h2 {...rest}>{children}</h2>
        </Link>
    );
};

export default DropdownLink;