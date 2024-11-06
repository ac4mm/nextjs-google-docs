export function AccountIcon({ firstLetterName }) {
    return (
        <a
            className='w-10 h-10 bg-green-700 text-slate-50 rounded-full inline-flex items-center justify-center'
            href=""
        >
            {firstLetterName}
        </a>
    );
}
