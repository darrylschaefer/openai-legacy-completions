import './globals.css';

export const metadata = {
title: 'OpenAI Legacy Completions',
description: "OpenAI Completions",
};

export default function RootLayout({ children }) {
return (
<html lang="en">
<body>{children}</body>
</html>
);
}