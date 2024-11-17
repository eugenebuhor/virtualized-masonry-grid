import { Caption, Description, Title } from './PhotoMeta.styled.ts';

interface PhotoMetaProps {
  photographer: string;
  alt?: string;
}

const PhotoMeta = ({ photographer, alt }: PhotoMetaProps) => {
  return (
    <>
      <Caption>taken by</Caption>
      <Title>{photographer}</Title>
      {alt ? <Description>{alt}</Description> : null}
    </>
  );
};

export default PhotoMeta;
