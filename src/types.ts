import type {
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';

export interface Sheets {}

export type SheetIds = keyof Sheets;

export type SheetID<Id extends SheetIds> = Id | (string & {});

export interface SheetDefinition<Payload = never, ReturnValue = never> {
  payload: Payload;
  returnValue: ReturnValue;
}

export type SheetPayload<Id extends SheetIds> = Sheets[Id]['payload'];

export type SheetReturnValue<Id extends SheetIds> = Sheets[Id]['returnValue'];

export interface SheetProps<Id extends SheetIds = SheetIds> {
  readonly id: SheetID<Id>;
  readonly payload: SheetPayload<Id>;
  readonly context: string;
}

export type AnimationConfigs = WithSpringConfig | WithTimingConfig;

export interface BottomSheetInstance<Id extends SheetIds = SheetIds> {
  /**
   * Close the bottom sheet.
   * @param args
   */
  readonly close: (
    ...args: SheetReturnValue<Id> extends never
      ? [
          options?: {
            /**
             * Snap animation configs.
             */
            animationConfigs?: AnimationConfigs;
          },
        ]
      : [
          options: {
            /**
             * Return some data to the caller on closing the `BottomSheet`.
             */
            value: SheetReturnValue<Id>;

            /**
             * Snap animation configs.
             */
            animationConfigs?: AnimationConfigs;
          },
        ]
  ) => void;

  /**
   * Snap to the maximum provided point from `snapPoints`.
   * @param animationConfigs Snap animation configs.
   */
  readonly expand: (animationConfigs?: AnimationConfigs) => void;

  /**
   * Snap to the minimum provided point from `snapPoints`.
   * @param animationConfigs Snap animation configs.
   */
  readonly collapse: (animationConfigs?: AnimationConfigs) => void;

  /**
   * Snap to one of the provided points from `snapPoints`.
   * @param index Snap point index.
   * @param animationConfigs Snap animation configs.
   */
  readonly snapToIndex: (
    index: number,
    animationConfigs?: AnimationConfigs
  ) => void;

  /**
   * Snap to a position out of provided  `snapPoints`.
   * @param position Position in pixel or percentage.
   * @param animationConfigs Snap animation configs.
   */
  readonly snapToPosition: (
    position: string | number,
    animationConfigs?: AnimationConfigs
  ) => void;
}
