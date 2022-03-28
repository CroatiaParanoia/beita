import { LocalAvatar } from '@components';
import { Card, Dialog, Ellipsis, Tag } from 'antd-mobile';
import { DeleteOutline } from 'antd-mobile-icons';
import IconThumbUpFill from '~icons/custom/thumb-up-fill';
import IconThumbDownFill from '~icons/custom/thumb-down-fill';
import { CSSProperties, FC } from 'react';
import clsx from 'clsx';
import { DreamDto } from '@api/shuke/Api';
import dayjs from 'dayjs';

export interface DreamCardProps {
  personal?: boolean;
  dream: DreamDto;
  className?: string;
  style?: CSSProperties;
}

export const DreamCard: FC<DreamCardProps> = ({ personal = false, className, dream }) => {
  const { isPublic, dream: dreamContent, nickname, createAt, userId } = dream;

  const extraTag = personal ? (
    !isPublic ? (
      <Tag color="danger" round>
        私密
      </Tag>
    ) : (
      <Tag color="success" round>
        公开
      </Tag>
    )
  ) : null;

  const handleDelete = () => {
    Dialog.confirm({
      content: '确认删除?',
      confirmText: '确认',
      cancelText: '取消',
      onConfirm() {
        // do something
      },
    });
  };

  return (
    <Card
      title={
        <div className="flex items-center">
          <LocalAvatar className="w-32px h-32px text-22px rounded-16px mr-5px" nickname={nickname} userId={userId} />
          <Ellipsis rows={1} content={nickname} className="w-152px" />
        </div>
      }
      extra={extraTag}
      className={clsx('rounded-8px', className)}
    >
      <Ellipsis
        className="pb-12px text-16px leading-22px"
        direction="end"
        content={dreamContent}
        rows={6}
        expandText="展开"
      />
      <div className="flex justify-between items-center">
        <div className="text-14px text-hex-888">{dayjs(createAt).fromNow()}</div>

        {personal ? (
          <DeleteOutline className="text-16px text-hex-FF3141" onClick={handleDelete} />
        ) : (
          <div className="flex items-center">
            <IconThumbUpFill className="text-16px mr-10px" />
            <IconThumbDownFill className="text-16px " />
          </div>
        )}
      </div>
    </Card>
  );
};
