import { IStackStyles, mergeStyleSets, Stack } from "@fluentui/react";

import { initializeIcons } from "@uifabric/icons";

import React from "react";
import IAppProps from "./IAppProps";
import IAppStatus from "./IAppPropsStatus";
import RulesManager from "./RulesManager";
import DisplayRules from "./DisplayRules";
import EditionMode from "./EditionMode";
import EditRule from "./EditRule";
import EditRuleset from "./EditRuleset";

const styles = mergeStyleSets({
  app: {
    margin: 20,
    backgroundColor: "cyan",
  },
  // rulesGrid: {
  //   display: "grid",
  //   gridTemplateColumns: "repeat(2, 1fr)",
  // },
});

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };

class App extends React.Component<IAppProps, IAppStatus> {
  constructor(props: IAppProps) {
    super(props);

    initializeIcons();

    this.state = {
      editionMode: EditionMode.Empty,
      ruleId: undefined,
      rulesetId: undefined,
    };
  }

  private renderEditionSection = (): JSX.Element | null => {
    if (this.state.editionMode === EditionMode.EditRule) {
      return <EditRule />;
    }

    if (this.state.editionMode === EditionMode.EditRuleset) {
      return <EditRuleset />;
    }

    return null;
  };

  // public componentDidMount(): void {
  //   this.setState({
  //     charOptions: Data.getCharNamesOptions(),
  //   });
  // }

  private editRule = (editValue?: number) => {
    this.setState({ editionMode: EditionMode.EditRule, ruleId: editValue });
  };

  private editRuleset = (editValue?: number) => {
    this.setState({
      editionMode: EditionMode.EditRuleset,
      rulesetId: editValue,
    });
  };

  public render() {
    return (
      <div className={styles.app}>
        <Stack>
          <Stack horizontal styles={stackStyles}>
            <RulesManager edit={this.editRuleset} />
            <DisplayRules edit={this.editRule} rulesetId={this.state.rulesetId} />
          </Stack>

          {this.renderEditionSection()}
        </Stack>
      </div>
    );
  }
}

export default App;
