import { subscribeToKeyboardEventToRemoveInspectPin } from './atoms/inspectPin/subscribeToKeyboardEventToRemoveInspectPin'
import { subscribeToMapMarkersChangelog } from './atoms/markerChangelog/subscribeToMapMarkersChangelog'
import { subscribeMapToSelectionContext } from './atoms/selection/subscribeMapToSelectionContext'
import { connectMapToLocationPin } from './atoms/locationPin/connectMapToLocationPin'
import { connectMapToInspectPin } from './atoms/inspectPin/connectMapToInspectPin'
import { connectMapToEditingState } from './interactions/editingState/connectMapToEditingState'
import { connectMapToExecutionEvents } from './atoms/executionEventMarkers/connectMapToExecutionEvents'
import {
  clearMapSelection,
  subscribeMapToSelection,
  unsubscribeMapFromSelection,
} from './atoms/selection/subscribeMapToSelection'

// ------------------------------------
// Core Map stuff
// ------------------------------------

export type { MapTile, MapSelectionMode } from './atoms/map/map'
export { Map } from './components/Map'
export { changeMapTiles } from './atoms/map/utils/changeMapTiles'

export { setMapSelectionMode } from './atoms/map/utils/setMapSelectionMode'
export { useMapSelectionContext } from './atoms/selection/hooks/useMapSelectionContext'
export { useMatchMapSelectionContext } from './atoms/selection/hooks/useMatchMapSelectionContext'

export { MapLayer } from './layers/components/MapLayer'
export { ConnectMapToList } from './layers/components/ConnectMapToList'

export type { FitMapOptions, FitMapToSelection } from './atoms/map/utils/fitMap'
export {
  fitMapToGeometry,
  fitMap,
  fitMapToSelection,
  fitMapToOrdersAndDepots,
} from './atoms/map/utils/fitMap'

// ------------------------------------
// Map Selection
// ------------------------------------
export { getMapSelectionContext } from './atoms/selection/read/getMapSelectionContext'

// ------------------------------------
// Map React hooks
// ------------------------------------

export { useShowMapTrafficTiles } from './atoms/map/hooks/useShowMapTrafficTiles'
export { useMapSelectionMode } from './atoms/map/hooks/useMapSelectionMode'
export { useGetMapInfo, getMapInfo } from './atoms/map/hooks/useGetMapInfo'
export { setMap, resetMap, useMap, useMapInstance } from './atoms/map/mapApi'
export { useLockMap } from './atoms/map/hooks/useLockMap'
export { useFitMapToSelection } from './atoms/map/hooks/useFitMapToSelection'
export { useFitMap } from './atoms/map/hooks/useFitMap'

// ------------------------------------
// Inspect Pin
// ------------------------------------

// read
export { getInspectPin } from './atoms/inspectPin/core/getInspectPin'

// write
export { removeInspectPin } from './atoms/inspectPin/core/removeInspectPin'
export { setInspectPin } from './atoms/inspectPin/core/setInspectPin'
export { addInspectPin } from './atoms/inspectPin/core/addInspectPin'

// hooks
export { useInspectPin } from './atoms/inspectPin/hooks/useInspectPin'
export { useSetInspectPin } from './atoms/inspectPin/hooks/useSetInspectPin'
export { useRemoveInspectPin } from './atoms/inspectPin/hooks/useRemoveInspectPin'
export { useToggleInspectPin } from './atoms/inspectPin/hooks/useToggleInspectPin'

// React Components
export { InspectPinMode } from './layers/pin/inspectPin/components/InspectPinMode'

// ------------------------------------
// Location Pins
// ------------------------------------

// utilities
export { createLocationPin } from './atoms/locationPin/core/utils/createLocationPin'

// read
export { getLocationPin } from './atoms/locationPin/core/getLocationPin'

// write
export { updateLocationPin } from './atoms/locationPin/core/updateLocationPin'
export { addLocationPin } from './atoms/locationPin/core/addLocationPin'
export { moveLocationPin } from './atoms/locationPin/core/moveLocationPin'
export { removeLocationPin } from './atoms/locationPin/core/removeLocationPin'
export { removeAllLocationPins } from './atoms/locationPin/core/removeAllLocationPins'
export { setLocationPinToSearchResult } from './atoms/locationPin/core/setLocationPinToSearchResult'

// subscribe
export { subscribeToLocationPin } from './atoms/locationPin/subscribeToLocationPin'

// hooks
export { useLocationPin } from './atoms/locationPin/hooks/useLocationPin'
export { useRemoveLocationPin } from './atoms/locationPin/hooks/useRemoveLocationPin'

// ------------------------------------
// Order's execution events Markers
// ------------------------------------

export type {
  PODMarker,
  ExecutionEventMarker,
  ExecutionEventMarkerType,
} from './atoms/executionEventMarkers/executionEventMarkers'

export { togglePoDMarker } from './atoms/executionEventMarkers/core/togglePoDMarker'
export { getExecutionEventMarkers } from './atoms/executionEventMarkers/core/getExecutionEventMarkers'
export { setExecutionEventMarkers } from './atoms/executionEventMarkers/core/setExecutionEventMarkers'
export { clearExecutionEventMarkers } from './atoms/executionEventMarkers/core/clearExecutionEventMarkers'

export { useActivePodMarker } from './atoms/executionEventMarkers/hooks/usePodMarker'
export { useExecutionEventMarkers } from './atoms/executionEventMarkers/hooks/useExecutionEventMarkers'

// ------------------------------------
// Editable Areas
// ------------------------------------

// read
export { getEditableArea } from './atoms/editableArea/core/getEditableArea'

// write
export { updateEditableArea } from './atoms/editableArea/core/updateEditableArea'
export { removeEditableArea } from './atoms/editableArea/core/removeEditableArea'

// subscribe
export { subscribeToEditableArea } from './atoms/editableArea/subscribeToEditableArea'

// hooks
export { useEditableArea } from './atoms/editableArea/hooks/useEditableArea'
export { useSetEditableArea } from './atoms/editableArea/hooks/useSetEditableArea'

// ComponentSize
export { DrawArea } from './components/DrawArea'

// ------------------------------------
// Editable Road segments
// ------------------------------------

// read
export { getEditableRoadSegment } from './atoms/editableRoadSegment/core/getEditableRoadSegment'

// write
export { updateEditableRoadSegment } from './atoms/editableRoadSegment/core/updateEditableRoadSegment'
export { removeEditableRoadSegment } from './atoms/editableRoadSegment/core/removeEditableRoadSegment'

// subscribe
export { subscribeToEditableRoadSegment } from './atoms/editableRoadSegment/subscribeToEditableRoadSegment'

// hooks
export { useEditableRoadSegment } from './atoms/editableRoadSegment/hooks/useEditableRoadSegment'
export { useSetEditableRoadSegment } from './atoms/editableRoadSegment/hooks/useSetEditableRoadSegment'

// ComponentSize
export { DrawRoadSegment } from './components/DrawRoadSegment'

// ------------------------------------
// Pending Fit Map
// ------------------------------------

export {
  getPendingFitMap,
  setPendingFitMap,
  applyPendingFitMap,
  resetPendingFitMap,
  usePendingFitMapOnMount,
} from './atoms/pendingFitMap'

export { clearMapSelection, subscribeMapToSelection, unsubscribeMapFromSelection }

export function subscribeMap() {
  // ------------------------------------
  // Map Marker changelog
  // ------------------------------------

  // start listening to server-data data events
  subscribeToMapMarkersChangelog()

  // ------------------------------------
  // Map selection
  // ------------------------------------

  subscribeMapToSelectionContext()
  subscribeMapToSelection()

  // ------------------------------------
  // Inspect Pin
  // ------------------------------------

  connectMapToInspectPin()

  // start listening to ESC keyboard events
  subscribeToKeyboardEventToRemoveInspectPin()

  // ------------------------------------
  // Location Pins
  // ------------------------------------

  connectMapToLocationPin()

  // ------------------------------------
  // Execution Events
  // ------------------------------------

  connectMapToExecutionEvents()

  // ------------------------------------
  // Connect to editing state
  // ------------------------------------

  connectMapToEditingState()
}
