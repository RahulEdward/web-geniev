/// <reference path="../../types/chrome-browser-os.d.ts" />

// ============= Re-export types from chrome.BrowserGenie namespace =============

export type InteractiveNode = chrome.BrowserGenie.InteractiveNode;
export type InteractiveSnapshot = chrome.BrowserGenie.InteractiveSnapshot;
export type InteractiveSnapshotOptions =
  chrome.BrowserGenie.InteractiveSnapshotOptions;
export type PageLoadStatus = chrome.BrowserGenie.PageLoadStatus;
export type InteractiveNodeType = chrome.BrowserGenie.InteractiveNodeType;
export type Rect = chrome.BrowserGenie.BoundingRect;

// New snapshot types
export type SnapshotType = chrome.BrowserGenie.SnapshotType;
export type SnapshotContext = chrome.BrowserGenie.SnapshotContext;
export type SectionType = chrome.BrowserGenie.SectionType;
export type TextSnapshotResult = chrome.BrowserGenie.TextSnapshotResult;
export type LinkInfo = chrome.BrowserGenie.LinkInfo;
export type LinksSnapshotResult = chrome.BrowserGenie.LinksSnapshotResult;
export type SnapshotSection = chrome.BrowserGenie.SnapshotSection;
export type Snapshot = chrome.BrowserGenie.Snapshot;
export type SnapshotOptions = chrome.BrowserGenie.SnapshotOptions;

// Preferences types
export type PrefObject = chrome.BrowserGenie.PrefObject;

// ============= BrowserGenie Adapter =============

// Screenshot size constants
export const SCREENSHOT_SIZES = {
  small: 512, // Low token usage
  medium: 768, // Balanced (default)
  large: 1028, // High detail (note: 1028 not 1024)
} as const;

export type ScreenshotSizeKey = keyof typeof SCREENSHOT_SIZES;

/**
 * Adapter for Chrome BrowserGenie Extension APIs
 * Provides a clean interface to BrowserGenie functionality with extensibility
 */
export class BrowserGenieAdapter {
  private static instance: BrowserGenieAdapter | null = null;

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): BrowserGenieAdapter {
    if (!BrowserGenieAdapter.instance) {
      BrowserGenieAdapter.instance = new BrowserGenieAdapter();
    }
    return BrowserGenieAdapter.instance;
  }

  /**
   * Get interactive snapshot of the current page
   */
  async getInteractiveSnapshot(
    tabId: number,
    options?: InteractiveSnapshotOptions,
  ): Promise<InteractiveSnapshot> {
    try {
      console.log(
        `[BrowserGenieAdapter] Getting interactive snapshot for tab ${tabId} with options: ${JSON.stringify(options)}`,
      );

      return new Promise<InteractiveSnapshot>((resolve, reject) => {
        if (options) {
          chrome.BrowserGenie.getInteractiveSnapshot(
            tabId,
            options,
            (snapshot: InteractiveSnapshot) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                console.log(
                  `[BrowserGenieAdapter] Retrieved snapshot with ${snapshot.elements.length} elements`,
                );
                resolve(snapshot);
              }
            },
          );
        } else {
          chrome.BrowserGenie.getInteractiveSnapshot(
            tabId,
            (snapshot: InteractiveSnapshot) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                console.log(
                  `[BrowserGenieAdapter] Retrieved snapshot with ${snapshot.elements.length} elements`,
                );
                resolve(snapshot);
              }
            },
          );
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to get interactive snapshot: ${errorMessage}`,
      );
      throw new Error(`Failed to get interactive snapshot: ${errorMessage}`);
    }
  }

  /**
   * Click an element by node ID
   */
  async click(tabId: number, nodeId: number): Promise<void> {
    try {
      console.log(`[BrowserGenieAdapter] Clicking node ${nodeId} in tab ${tabId}`);

      return new Promise<void>((resolve, reject) => {
        chrome.BrowserGenie.click(tabId, nodeId, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[BrowserGenieAdapter] Failed to click node: ${errorMessage}`);
      throw new Error(`Failed to click node ${nodeId}: ${errorMessage}`);
    }
  }

  /**
   * Input text into an element
   */
  async inputText(tabId: number, nodeId: number, text: string): Promise<void> {
    try {
      console.log(
        `[BrowserGenieAdapter] Inputting text into node ${nodeId} in tab ${tabId}`,
      );

      return new Promise<void>((resolve, reject) => {
        chrome.BrowserGenie.inputText(tabId, nodeId, text, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[BrowserGenieAdapter] Failed to input text: ${errorMessage}`);
      throw new Error(
        `Failed to input text into node ${nodeId}: ${errorMessage}`,
      );
    }
  }

  /**
   * Clear text from an element
   */
  async clear(tabId: number, nodeId: number): Promise<void> {
    try {
      console.log(`[BrowserGenieAdapter] Clearing node ${nodeId} in tab ${tabId}`);

      return new Promise<void>((resolve, reject) => {
        chrome.BrowserGenie.clear(tabId, nodeId, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[BrowserGenieAdapter] Failed to clear node: ${errorMessage}`);
      throw new Error(`Failed to clear node ${nodeId}: ${errorMessage}`);
    }
  }

  /**
   * Scroll to a specific node
   */
  async scrollToNode(tabId: number, nodeId: number): Promise<boolean> {
    try {
      console.log(
        `[BrowserGenieAdapter] Scrolling to node ${nodeId} in tab ${tabId}`,
      );

      return new Promise<boolean>((resolve, reject) => {
        chrome.BrowserGenie.scrollToNode(tabId, nodeId, (scrolled: boolean) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(scrolled);
          }
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to scroll to node: ${errorMessage}`,
      );
      throw new Error(`Failed to scroll to node ${nodeId}: ${errorMessage}`);
    }
  }

  /**
   * Send keyboard keys
   */
  async sendKeys(tabId: number, keys: chrome.BrowserGenie.Key): Promise<void> {
    try {
      console.log(`[BrowserGenieAdapter] Sending keys "${keys}" to tab ${tabId}`);

      return new Promise<void>((resolve, reject) => {
        chrome.BrowserGenie.sendKeys(tabId, keys, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[BrowserGenieAdapter] Failed to send keys: ${errorMessage}`);
      throw new Error(`Failed to send keys: ${errorMessage}`);
    }
  }

  /**
   * Get page load status
   */
  async getPageLoadStatus(tabId: number): Promise<PageLoadStatus> {
    try {
      console.log(
        `[BrowserGenieAdapter] Getting page load status for tab ${tabId}`,
      );

      return new Promise<PageLoadStatus>((resolve, reject) => {
        chrome.BrowserGenie.getPageLoadStatus(tabId, (status: PageLoadStatus) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(status);
          }
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to get page load status: ${errorMessage}`,
      );
      throw new Error(`Failed to get page load status: ${errorMessage}`);
    }
  }

  /**
   * Get accessibility tree (if available)
   */
  async getAccessibilityTree(
    tabId: number,
  ): Promise<chrome.BrowserGenie.AccessibilityTree> {
    try {
      console.log(
        `[BrowserGenieAdapter] Getting accessibility tree for tab ${tabId}`,
      );

      return new Promise<chrome.BrowserGenie.AccessibilityTree>(
        (resolve, reject) => {
          chrome.BrowserGenie.getAccessibilityTree(
            tabId,
            (tree: chrome.BrowserGenie.AccessibilityTree) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve(tree);
              }
            },
          );
        },
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to get accessibility tree: ${errorMessage}`,
      );
      throw new Error(`Failed to get accessibility tree: ${errorMessage}`);
    }
  }

  /**
   * Capture a screenshot of the tab
   * @param tabId - The tab ID to capture
   * @param size - Optional screenshot size ('small', 'medium', or 'large')
   * @param showHighlights - Optional flag to show element highlights
   * @param width - Optional exact width for screenshot
   * @param height - Optional exact height for screenshot
   */
  async captureScreenshot(
    tabId: number,
    size?: ScreenshotSizeKey,
    showHighlights?: boolean,
    width?: number,
    height?: number,
  ): Promise<string> {
    try {
      const sizeDesc = size ? ` (${size})` : "";
      const highlightDesc = showHighlights ? " with highlights" : "";
      const dimensionsDesc = width && height ? ` (${width}x${height})` : "";
      console.log(
        `[BrowserGenieAdapter] Capturing screenshot for tab ${tabId}${sizeDesc}${highlightDesc}${dimensionsDesc}`,
      );

      return new Promise<string>((resolve, reject) => {
        // Use exact dimensions if provided
        if (width !== undefined && height !== undefined) {
          chrome.BrowserGenie.captureScreenshot(
            tabId,
            0, // thumbnailSize ignored when width/height specified
            showHighlights || false,
            width,
            height,
            (dataUrl: string) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                console.log(
                  `[BrowserGenieAdapter] Screenshot captured for tab ${tabId} (${width}x${height})${highlightDesc}`,
                );
                resolve(dataUrl);
              }
            },
          );
        } else if (size !== undefined || showHighlights !== undefined) {
          const pixelSize = size ? SCREENSHOT_SIZES[size] : 0;
          // Use the API with thumbnail size and highlights
          if (showHighlights !== undefined) {
            chrome.BrowserGenie.captureScreenshot(
              tabId,
              pixelSize,
              showHighlights,
              (dataUrl: string) => {
                if (chrome.runtime.lastError) {
                  reject(new Error(chrome.runtime.lastError.message));
                } else {
                  console.log(
                    `[BrowserGenieAdapter] Screenshot captured for tab ${tabId}${sizeDesc}${highlightDesc}`,
                  );
                  resolve(dataUrl);
                }
              },
            );
          } else {
            chrome.BrowserGenie.captureScreenshot(
              tabId,
              pixelSize,
              (dataUrl: string) => {
                if (chrome.runtime.lastError) {
                  reject(new Error(chrome.runtime.lastError.message));
                } else {
                  console.log(
                    `[BrowserGenieAdapter] Screenshot captured for tab ${tabId} (${size}: ${pixelSize}px)`,
                  );
                  resolve(dataUrl);
                }
              },
            );
          }
        } else {
          // Use the original API without size (backwards compatibility)
          chrome.BrowserGenie.captureScreenshot(tabId, (dataUrl: string) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              console.log(
                `[BrowserGenieAdapter] Screenshot captured for tab ${tabId}`,
              );
              resolve(dataUrl);
            }
          });
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to capture screenshot: ${errorMessage}`,
      );
      throw new Error(`Failed to capture screenshot: ${errorMessage}`);
    }
  }

  /**
   * Get a content snapshot of the specified type from the page
   */
  async getSnapshot(
    tabId: number,
    type: SnapshotType,
    options?: SnapshotOptions,
  ): Promise<Snapshot> {
    try {
      console.log(
        `[BrowserGenieAdapter] Getting ${type} snapshot for tab ${tabId} with options: ${JSON.stringify(options)}`,
      );

      return new Promise<Snapshot>((resolve, reject) => {
        if (options) {
          chrome.BrowserGenie.getSnapshot(
            tabId,
            type,
            options,
            (snapshot: Snapshot) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                console.log(
                  `[BrowserGenieAdapter] Retrieved ${type} snapshot with ${snapshot.sections.length} sections`,
                );
                resolve(snapshot);
              }
            },
          );
        } else {
          chrome.BrowserGenie.getSnapshot(tabId, type, (snapshot: Snapshot) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              console.log(
                `[BrowserGenieAdapter] Retrieved ${type} snapshot with ${snapshot.sections.length} sections`,
              );
              resolve(snapshot);
            }
          });
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to get ${type} snapshot: ${errorMessage}`,
      );
      throw new Error(`Failed to get ${type} snapshot: ${errorMessage}`);
    }
  }

  /**
   * Get text content snapshot from the page
   * Convenience method for text snapshot
   */
  async getTextSnapshot(
    tabId: number,
    options?: SnapshotOptions,
  ): Promise<Snapshot> {
    return this.getSnapshot(tabId, "text", options);
  }

  /**
   * Get links snapshot from the page
   * Convenience method for links snapshot
   */
  async getLinksSnapshot(
    tabId: number,
    options?: SnapshotOptions,
  ): Promise<Snapshot> {
    return this.getSnapshot(tabId, "links", options);
  }

  /**
   * Generic method to invoke any BrowserGenie API
   * Useful for future APIs or experimental features
   */
  async invokeAPI(method: string, ...args: any[]): Promise<any> {
    try {
      console.log(`[BrowserGenieAdapter] Invoking BrowserGenie API: ${method}`);

      if (!(method in chrome.BrowserGenie)) {
        throw new Error(`Unknown BrowserGenie API method: ${method}`);
      }

      // @ts-expect-error - Dynamic API invocation
      const result = await chrome.BrowserGenie[method](...args);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to invoke API ${method}: ${errorMessage}`,
      );
      throw new Error(
        `Failed to invoke BrowserGenie API ${method}: ${errorMessage}`,
      );
    }
  }

  /**
   * Check if a specific API is available
   */
  isAPIAvailable(method: string): boolean {
    return method in chrome.BrowserGenie;
  }

  /**
   * Get list of available BrowserGenie APIs
   */
  getAvailableAPIs(): string[] {
    return Object.keys(chrome.BrowserGenie).filter((key) => {
      // @ts-expect-error - Dynamic key access for API discovery
      return typeof chrome.BrowserGenie[key] === "function";
    });
  }

  /**
   * Get BrowserGenie version information
   */
  async getVersion(): Promise<string | null> {
    try {
      console.log("[BrowserGenieAdapter] Getting BrowserGenie version");

      return new Promise<string | null>((resolve, reject) => {
        // Check if getVersionNumber API is available
        if (
          "getVersionNumber" in chrome.BrowserGenie &&
          typeof chrome.BrowserGenie.getVersionNumber === "function"
        ) {
          chrome.BrowserGenie.getVersionNumber((version: string) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              console.log(`[BrowserGenieAdapter] BrowserGenie version: ${version}`);
              resolve(version);
            }
          });
        } else {
          // Fallback - return null if API not available
          resolve(null);
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to get version: ${errorMessage}`,
      );
      // Return null on error
      return null;
    }
  }

  /**
   * Log a metric event with optional properties
   */
  async logMetric(
    eventName: string,
    properties?: Record<string, any>,
  ): Promise<void> {
    try {
      console.log(
        `[BrowserGenieAdapter] Logging metric: ${eventName} with properties: ${JSON.stringify(properties)}`,
      );

      return new Promise<void>((resolve, reject) => {
        // Check if logMetric API is available
        if (
          "logMetric" in chrome.BrowserGenie &&
          typeof chrome.BrowserGenie.logMetric === "function"
        ) {
          if (properties) {
            chrome.BrowserGenie.logMetric(eventName, properties, () => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                console.log(`[BrowserGenieAdapter] Metric logged: ${eventName}`);
                resolve();
              }
            });
          } else {
            chrome.BrowserGenie.logMetric(eventName, () => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                console.log(`[BrowserGenieAdapter] Metric logged: ${eventName}`);
                resolve();
              }
            });
          }
        } else {
          // If API not available, log a warning but don't fail
          console.warn(
            `[BrowserGenieAdapter] logMetric API not available, skipping metric: ${eventName}`,
          );
          resolve();
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`[BrowserGenieAdapter] Failed to log metric: ${errorMessage}`);
      return;
    }
  }

  /**
   * Execute JavaScript code in the specified tab
   * @param tabId - The tab ID to execute code in
   * @param code - The JavaScript code to execute
   * @returns The result of the execution
   */
  async executeJavaScript(tabId: number, code: string): Promise<any> {
    try {
      console.log(
        `[BrowserGenieAdapter] Executing JavaScript in tab ${tabId}`,
      );

      return new Promise<any>((resolve, reject) => {
        // Check if executeJavaScript API is available
        if (
          "executeJavaScript" in chrome.BrowserGenie &&
          typeof chrome.BrowserGenie.executeJavaScript === "function"
        ) {
          chrome.BrowserGenie.executeJavaScript(tabId, code, (result: any) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              console.log(
                `[BrowserGenieAdapter] JavaScript executed successfully in tab ${tabId}`,
              );
              resolve(result);
            }
          });
        } else {
          reject(new Error("executeJavaScript API not available"));
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to execute JavaScript: ${errorMessage}`,
      );
      throw new Error(`Failed to execute JavaScript: ${errorMessage}`);
    }
  }

  /**
   * Click at specific viewport coordinates
   * @param tabId - The tab ID to click in
   * @param x - X coordinate in viewport pixels
   * @param y - Y coordinate in viewport pixels
   */
  async clickCoordinates(tabId: number, x: number, y: number): Promise<void> {
    try {
      console.log(
        `[BrowserGenieAdapter] Clicking at coordinates (${x}, ${y}) in tab ${tabId}`,
      );

      return new Promise<void>((resolve, reject) => {
        // Check if clickCoordinates API is available
        if (
          "clickCoordinates" in chrome.BrowserGenie &&
          typeof chrome.BrowserGenie.clickCoordinates === "function"
        ) {
          chrome.BrowserGenie.clickCoordinates(tabId, x, y, () => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              console.log(
                `[BrowserGenieAdapter] Successfully clicked at (${x}, ${y}) in tab ${tabId}`,
              );
              resolve();
            }
          });
        } else {
          reject(new Error("clickCoordinates API not available"));
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to click at coordinates: ${errorMessage}`,
      );
      throw new Error(`Failed to click at coordinates (${x}, ${y}): ${errorMessage}`);
    }
  }

  /**
   * Type text at specific viewport coordinates
   * @param tabId - The tab ID to type in
   * @param x - X coordinate in viewport pixels
   * @param y - Y coordinate in viewport pixels
   * @param text - Text to type at the location
   */
  async typeAtCoordinates(
    tabId: number,
    x: number,
    y: number,
    text: string,
  ): Promise<void> {
    try {
      console.log(
        `[BrowserGenieAdapter] Typing at coordinates (${x}, ${y}) in tab ${tabId}`,
      );

      return new Promise<void>((resolve, reject) => {
        // Check if typeAtCoordinates API is available
        if (
          "typeAtCoordinates" in chrome.BrowserGenie &&
          typeof chrome.BrowserGenie.typeAtCoordinates === "function"
        ) {
          chrome.BrowserGenie.typeAtCoordinates(tabId, x, y, text, () => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              console.log(
                `[BrowserGenieAdapter] Successfully typed "${text}" at (${x}, ${y}) in tab ${tabId}`,
              );
              resolve();
            }
          });
        } else {
          reject(new Error("typeAtCoordinates API not available"));
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to type at coordinates: ${errorMessage}`,
      );
      throw new Error(
        `Failed to type at coordinates (${x}, ${y}): ${errorMessage}`,
      );
    }
  }

  /**
   * Get a specific preference value
   * @param name - The preference name (e.g., "BrowserGenie.server.mcp_port")
   * @returns Promise resolving to the preference object containing key, type, and value
   */
  async getPref(name: string): Promise<PrefObject> {
    try {
      console.log(`[BrowserGenieAdapter] Getting preference: ${name}`);

      return new Promise<PrefObject>((resolve, reject) => {
        chrome.BrowserGenie.getPref(name, (pref: PrefObject) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            console.log(
              `[BrowserGenieAdapter] Retrieved preference ${name}: ${JSON.stringify(pref)}`,
            );
            resolve(pref);
          }
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to get preference: ${errorMessage}`,
      );
      throw new Error(`Failed to get preference ${name}: ${errorMessage}`);
    }
  }

  /**
   * Set a specific preference value
   * @param name - The preference name (e.g., "BrowserGenie.server.mcp_enabled")
   * @param value - The value to set
   * @param pageId - Optional page ID for settings tracking
   * @returns Promise resolving to true if successful
   */
  async setPref(
    name: string,
    value: any,
    pageId?: string,
  ): Promise<boolean> {
    try {
      console.log(
        `[BrowserGenieAdapter] Setting preference ${name} to ${JSON.stringify(value)}`,
      );

      return new Promise<boolean>((resolve, reject) => {
        if (pageId !== undefined) {
          chrome.BrowserGenie.setPref(name, value, pageId, (success: boolean) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              console.log(
                `[BrowserGenieAdapter] Successfully set preference ${name}`,
              );
              resolve(success);
            }
          });
        } else {
          chrome.BrowserGenie.setPref(name, value, (success: boolean) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError.message));
            } else {
              console.log(
                `[BrowserGenieAdapter] Successfully set preference ${name}`,
              );
              resolve(success);
            }
          });
        }
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to set preference: ${errorMessage}`,
      );
      throw new Error(`Failed to set preference ${name}: ${errorMessage}`);
    }
  }

  /**
   * Get all preferences (filtered to BrowserGenie.* prefs)
   * @returns Promise resolving to array of preference objects
   */
  async getAllPrefs(): Promise<PrefObject[]> {
    try {
      console.log("[BrowserGenieAdapter] Getting all preferences");

      return new Promise<PrefObject[]>((resolve, reject) => {
        chrome.BrowserGenie.getAllPrefs((prefs: PrefObject[]) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            console.log(
              `[BrowserGenieAdapter] Retrieved ${prefs.length} preferences`,
            );
            resolve(prefs);
          }
        });
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `[BrowserGenieAdapter] Failed to get all preferences: ${errorMessage}`,
      );
      throw new Error(`Failed to get all preferences: ${errorMessage}`);
    }
  }
}

// Export singleton instance getter for convenience
export const getBrowserGenieAdapter = () => BrowserGenieAdapter.getInstance();
