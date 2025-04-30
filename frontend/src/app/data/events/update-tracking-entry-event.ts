import { TrackingUnitSelection } from '../tracking-unit-selection.model';
import { TrackingEntry } from '../models/tracking-entry.model';

export interface UpdateTrackingEntryEvent {
  amount: number;
  trackingUnitSelection: TrackingUnitSelection;
  originalTrackingEntry: TrackingEntry;
}
