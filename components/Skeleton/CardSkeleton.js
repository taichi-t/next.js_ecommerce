import Skeleton from 'react-loading-skeleton';

export default function CardSkeleton({ count }) {
  const arr = Array.from({ length: count });
  return arr.map((_, i) => (
    <div style={{ display: 'flex', paddingBottom: '1em' }} key={i}>
      <div>
        <Skeleton height={150} width={150} />
      </div>
      <div
        style={{
          fontSize: 20,
          lineHeight: 2,
          width: '100%',
          marginLeft: '1em',
        }}
      >
        <Skeleton count={4} />
      </div>
    </div>
  ));
}
