// Papers and sources are always referred to by name, with a link.
export const AttentionIsAllYouNeed = () => (
  <a
    href="https://arxiv.org/abs/1706.03762"
    target="_blank"
    rel="noreferrer"
    className="italic underline decoration-dotted underline-offset-2 hover:text-primary"
  >
    Attention Is All You Need
  </a>
);

export const IlyaSutskeverInterview = ({ children }: { children: React.ReactNode }) => (
  <a
    href="https://www.youtube.com/watch?v=GI4Tpi48DlA"
    target="_blank"
    rel="noreferrer"
    className="underline decoration-dotted underline-offset-2 hover:text-primary"
  >
    {children}
  </a>
);
