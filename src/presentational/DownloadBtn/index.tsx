import * as React from 'react';
import axios from 'axios';

import { BASE_URI } from '../../constants';
import { DownloadBtnProps } from '../../data/download-btn-props';

const DownloadBtn = (downloadBtnProps: DownloadBtnProps) => {
    const { fileMetadata } = downloadBtnProps;

    const onClick = () => {
        axios.get(`${BASE_URI}/download/file`, {
            headers: {
                fileName: fileMetadata.name,
                fileType: fileMetadata.type,
                fileExt: fileMetadata.ext,
                'Accept': fileMetadata.type
            },
            responseType: 'blob'
        })
        .then(res => {
            const blob = new Blob([res.data], { type: fileMetadata.type });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileMetadata.name + fileMetadata.ext);
            link.setAttribute('content', 'text/html;charset=utf-8');
            document.body.appendChild(link);
            link.click();
        })
        .catch(err => {
            console.log("Failed to download file, " + fileMetadata.name);

            if (err.response) {
                console.log(err.response);
            } else if (err.request) {
                console.log(err.request);
            } else {
                console.log(err.message);
            }
        });
    };

    return <button
        type='button'
        onClick={ onClick }
    >
        Download file
    </button>;
}

export default DownloadBtn;
